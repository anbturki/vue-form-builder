<template>
<div>
  <div
    class="form-builder__section"
    v-section="mouseMove"
    ref="section"
    :class="{active: (mouseOver || section.key === activeField.key) && section.questions.length}"
    @click="setActive(section)"
    :style="sectionStyle"
    @mouseover="mouseOver = pickedField.type !== 'section'"
    @mouseout="mouseOver = false">
    <div class="form-builder__section__header" v-if="section.name && section.showHeader" :style="sectionHeaderStyle">
      <i class="material-icons">{{section.icon}}</i>{{section.name}}
    </div>
    <div class="form-builder__section__fields">
      <transition-group tag="ul" style="padding: 0" name="slide-fade">
        <li v-for="field in section.questions"
          :key="field.key"
          :class="fieldClasses(field)"
          @mouseover.stop
          @click.stop="setActive(field)"
          class="simulated-field">
          <div class="field-wrapper">
            <i class="material-icons">{{field.icon}}</i>
            <span class="field-name">{{field.name}}</span>
          </div>
          <span class="remove-field" v-if="field.key === activeField.key" @click="showDialog = true">
            <i class="material-icons">delete</i>
          </span>
        </li>
      </transition-group>
    </div>
    <div
      class="form-builder__section__placeholder"
      ref="placeholder"
      v-if="placeholderVisiblity && pickedField.type !== 'section'">
    </div>
  </div>
  <transition name="slide-fade">
    <FieldDialog v-if="showDialog" @yes="onDelete" @cancel="showDialog = false"/>
  </transition>
</div>
</template>
<script>
import EventBus from '@/EventBus'
import FieldDialog from '@/components/FieldDialog'
export default {
  components: { FieldDialog },
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
      activeField: {}
    }
  },
  computed: {
    sectionStyle () {
      let styles = {}
      if (!this.section.name && !this.mouseOver) {
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
      EventBus.$emit('deleteField', { field: this.activeField, sectionKey: this.section.key })
      this.showDialog = false
    },
    fieldClasses (field) {
      return {
        RTLdirection: this.arPattern.test(field.name),
        active: field.key === this.activeField.key && !this.mouseOver
      }
    },
    setActive (field) {
      EventBus.$emit('setActiveField', { field, sectionKey: this.section.key })
      this.activeField = field
      EventBus.$on('setActiveField', ({ field }) => {
        this.activeField = field
      })
    },
    mouseMove (event) {
      if (this.moving) {
        this.placeholderVisiblity = true
        this.$nextTick(() => {
          EventBus.$emit('activePlaceholder', { status: this.placeholderVisiblity, section: this.section.key })
        })
      }
    }
  },
  watch: {
    'section.name': function (v) {
      this.arHeader = this.arPattern.test(v)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style'
</style>
