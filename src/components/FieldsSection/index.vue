<template>
<div>
  <div
    class="form-builder__section"
    v-section="mouseMove"
    ref="section"
    :class="{active: (mouseOver || section.pk === activeField.pk) && section.questions.length}"
    @click="setActive(section)"
    :style="sectionStyle"
    @mouseover="mouseOver = pickedField.type !== 'section'"
    @mouseout="mouseOver = false">
    <div class="form-builder__section__header" v-if="section.title && section.showHeader" :style="sectionHeaderStyle">
      <i class="material-icons">{{section.icon}}</i>{{section.title}}
    </div>
    <div class="form-builder__section__fields">
      <transition-group tag="ul" style="padding: 0" name="slide-fade">
        <template v-for="(field) in section.questions">
          <FieldsSimulatedField
            :class="fieldClasses(field)"
            :field="field"
            :key="field.pk"
            @click.native.stop="setActive(field)"
            @showDeleteDialog="showDialog = true"
            :show-delete="field.pk === activeField.pk"
            @mouseout="moveOnField"
            />
        </template>
        <li
          :key="section.pk"
          class="form-builder__section__placeholder"
          ref="placeholder"
          v-if="placeholderVisiblity && pickedField.type !== 'section'">
        </li>
      </transition-group>
    </div>
  </div>
  <FieldDialog v-if="showDialog" @yes="onDelete" @cancel="showDialog = false"/>
</div>
</template>
<script>
import EventBus from '@/EventBus'
import FieldDialog from '@/components/FieldDialog'
import FieldsSimulatedField from '@/components/FieldsSimulatedField'
export default {
  components: { FieldDialog, FieldsSimulatedField },
  name: 'FieldsSection',
  props: {
    section: {
      type: Object,
      required: true
    },
    moving: {
      type: Boolean
    }
  },
  data () {
    return {
      showDialog: false,
      arHeader: false,
      placeholderVisiblity: false,
      mouseOver: false,
      pickedField: {},
      arPattern: /[\u0600-\u06FF]/,
      activeField: {},
      moveOnField: false
    }
  },
  computed: {
    sectionStyle () {
      let styles = {}
      if (!this.section.title && !this.mouseOver) {
        styles = { 'border-color': 'transparent' }
      }
      return styles
    },
    sectionHeaderStyle () {
      if (this.arHeader) {
        return {
          direction: 'rtl'
        }
      } else {
        return {
          direction: 'ltr'
        }
      }
    }
  },
  mounted () {
    EventBus.$on('fieldPicked', (field) => {
      this.pickedField = field
    })
    EventBus.$on('updatePlaceholder', (status) => {
      this.$nextTick(() => {
        this.placeholderVisiblity = false
      })
    })
  },
  methods: {
    onDelete () {
      EventBus.$emit('deleteField', { field: this.activeField, sectionKey: this.section.pk })
      this.showDialog = false
    },
    fieldClasses (field) {
      return {
        RTLdirection: this.arPattern.test(field.title),
        active: field.pk === this.activeField.pk && !this.mouseOver
      }
    },
    setActive (field) {
      EventBus.$emit('setActiveField', { field, sectionKey: this.section.pk })
      this.activeField = field
      EventBus.$on('setActiveField', ({ field }) => {
        this.activeField = field
      })
    },
    mouseMove (event) {
      if (this.moving) {
        this.placeholderVisiblity = true
      }
    }
  },
  watch: {
    'section.title': function (v) {
      this.arHeader = this.arPattern.test(v)
    },
    'placeholderVisiblity': function (status) {
      EventBus.$emit('activePlaceholder', { status, section: this.section.pk })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style'
</style>
