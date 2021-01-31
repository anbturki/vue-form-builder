<template>
  <div class="form-builder">
    <FieldsDragger :field="pickedField" v-model="moving"/>
    <FieldsMenu @mousedown="onMouseDown" @captureField="onFieldPicked"/>
    <FieldsRepresent :is-field-prop-open="!!Object.keys(activeField).length" :moving="moving" :sections="sections"/>
    <FieldProperties :is-open="!!Object.keys(activeField).length" :field="activeField" />
  </div>
</template>
<script>
import FieldsMenu from '@/components/FieldsMenu'
import FieldsRepresent from '@/components/FieldsRepresent'
import FieldsDragger from '@/components/FieldsDragger'
import FieldProperties from '@/components/FieldProperties'
import EventBus from '@/EventBus'
export default {
  components: { FieldsMenu, FieldsRepresent, FieldsDragger, FieldProperties },
  name: 'App',
  data () {
    return {
      pickedField: {},
      activeField: {},
      moving: false,
      sections: [
        {
          title: 'Default',
          type: 'section',
          icon: 'view_module',
          showHeader: false,
          sub_sections: [],
          description: '',
          pk: '_' + Math.random().toString(36).substr(2, 9),
          order: 1,
          questions: []
        }
      ]
    }
  },
  mounted () {
    EventBus.$on('deleteField', ({ field, sectionKey }) => {
      const sectionIndex = this.sections.findIndex(sec => sec.pk === sectionKey)
      const questionIndex = this.sections[sectionIndex].questions.findIndex(f => f.pk === field.pk)
      this.sections[sectionIndex].questions.splice(questionIndex, 1)
    })
    EventBus.$on('setActiveField', ({ field, sectionKey }) => {
      this.activeField = field
    })
    EventBus.$on('upadeMoving', (status) => {
      this.moving = status
    })
    EventBus.$on('pushFeild', (sectionKey) => {
      if (this.pickedField.type === 'section') {
        let section = { ...this.pickedField }
        this.$set(section, 'questions', [])
        const sectionIndex = this.sections.findIndex(sec => sec.pk === sectionKey)
        this.sections.splice(sectionIndex + 1, 0, section)
      } else {
        const sectionIndex = this.sections.findIndex(sec => sec.pk === sectionKey)
        this.sections[sectionIndex].questions.push(this.pickedField)
      }
      this.activeField = this.pickedField
    })
  },
  methods: {
    onFieldPicked (field) {
      this.pickedField = field
      EventBus.$emit('fieldPicked', field)
    },
    onMouseDown (event) {
      EventBus.$emit('mouseDragging', event)
    },
    createPlaceholderField () {
      return {
        pk: '_' + Math.random().toString(36).substr(2, 9),
        type: 'fake'
      }
    }
  }
}
</script>
<style lang="scss">
  .floating-btn {
    outline: none;
    border: none;
    background-color: cornflowerblue;
    color: #fff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 999;
    box-shadow: 0px 2px 20px 0px #bdbdbd;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
</style>
