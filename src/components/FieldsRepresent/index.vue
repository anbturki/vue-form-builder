<template>
  <div class="form-builder__represent" :class="{'field-props-open': isFieldPropOpen}">
    <!-- <div class="drag_and_drop" v-if="!sections[0].questions.length">
      <img src="/images/drag.svg" />
      <p>Drag and drop a field here</p>
    </div> -->
    <FieldsSection
      v-for="section in sections"
      :key="section.pk"
      :section="section"
      :moving="moving"/>
      <div style="min-height: 100px" v-show="pickedField.type === 'section'" v-section="mouseMove">
        <div class="field-placeholder" style="margin: 20px 0" v-if="placeholderVisiblity && pickedField.type === 'section'"></div>
      </div>
  </div>
</template>
<script>
import FieldsSection from '@/components/FieldsSection'
import EventBus from '@/EventBus'
export default {
  components: { FieldsSection },
  name: 'FieldsRepresent',
  props: {
    moving: {
      type: Boolean
    },
    sections: {
      type: Array,
      required: true
    },
    isFieldPropOpen: {
      type: Boolean
    }
  },
  data () {
    return {
      placeholderVisiblity: false,
      pickedField: {}
    }
  },
  mounted () {
    EventBus.$on('fieldPicked', (field) => {
      this.pickedField = field
    })
    EventBus.$on('activePlaceholder', ({ status }) => {
      this.placeholderVisiblity = status
    })
    EventBus.$on('updatePlaceholder', (status) => {
      this.placeholderVisiblity = status
    })
  },
  methods: {
    mouseMove (event) {
      if (this.moving) {
        EventBus.$emit('activePlaceholder', { status: true, section: this.sections[this.sections.length - 1].pk })
        this.placeholderVisiblity = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style'
</style>
