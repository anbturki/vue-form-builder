<template>
  <div class="form-builder">
    <FieldsDragger :field="pickedField" v-model="moving"/>
    <FieldsMenu @mousedown="onMouseDown" @captureField="onFieldPicked"/>
    <FieldsRepresent :moving="moving" :sections="sections"/>
    <!-- Field property -->
  </div>
</template>
<script>
import FieldsMenu from '@/components/FieldsMenu'
import FieldsRepresent from '@/components/FieldsRepresent'
import FieldsDragger from '@/components/FieldsDragger'
import EventBus from '@/EventBus'
export default {
  components: { FieldsMenu, FieldsRepresent, FieldsDragger },
  name: 'App',
  data () {
    return {
      pickedField: {},
      moving: false,
      sections: [
        {
          name: 'default',
          type: 'section',
          description: '',
          key: '_' + Math.random().toString(36).substr(2, 9),
          order: 1,
          questions: []
        }
      ]
    }
  },
  mounted () {
    EventBus.$on('upadeMoving', (status) => {
      this.moving = status
    })
    EventBus.$on('pushFeild', (sectionKey) => {
      if (this.pickedField.type === 'section') {
        let section = { ...this.pickedField }
        this.$set(section, 'questions', [])
        const sectionIndex = this.sections.findIndex(sec => sec.key === sectionKey)
        this.sections.splice(sectionIndex + 1, 0, section)
        // this.sections.push(section)
      } else {
        const sectionIndex = this.sections.findIndex(sec => sec.key === sectionKey)
        this.sections[sectionIndex].questions.push(this.pickedField)
      }
    })
  },
  methods: {
    onFieldPicked (field) {
      this.pickedField = field
    },
    onMouseDown (event) {
      EventBus.$emit('fieldPicked', event)
    }
  }
}
</script>
