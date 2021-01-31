<template>
  <li class="form-builder__fields-menu__items__item" @mousedown="onMouseDownOnField">
    <span class="form-builder__fields-menu__items__item__icon">
      <i class="material-icons">{{icon}}</i>
    </span>
    <span class="form-builder__fields-menu__items__item__name">{{name}}</span>
  </li>
</template>
<script>
export default {
  name: 'FieldsItemMenu',
  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    genPk () {
      return `_${Math.random().toString(36).substr(2, 9)}`
    },
    /**
     * Executed when mouse is down over the menu item.
     * It emits mouse event to Menu Wrapper component.
     * @method onMouseDownOnField
     * @param {MouseEvent} event
     */
    onMouseDownOnField (event) {
      const field = {
        title: this.name,
        icon: this.icon,
        type: this.type,
        description: '',
        value: '',
        pk: this.genPk(),
        event
      }
      if (this.type === 'checkbox') {
        field.value = []
      }
      switch (this.type) {
        case 'radio':
        case 'checkbox':
        case 'multiselect':
        case 'dropdown':
          this.$set(field, 'choices', [
            { pk: this.genPk(), title: 'choice' },
            { pk: this.genPk(), title: 'choice' },
            { pk: this.genPk(), title: 'choice' }
          ])
          field.type = 'choices'
          this.$set(field, 'widget', 'dropdown')
          this.$set(field, 'multi_select', false)
          if (this.type === 'radio') {
            field.widget = 'radio'
          } else if (this.type === 'checkbox') {
            field.widget = 'radio'
            field.multi_select = true
          } else if (this.type === 'multiselect') {
            field.multi_select = true
          }
          break
        case 'long_text':
          this.$set(field, 'max_length', null)
          break
        case 'section':
          this.$set(field, 'showHeader', true)
          this.$set(field, 'sub_sections', [])
          break
      }
      this.$emit('mousedown', field)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-builder__fields-menu__items__item {
  color: #0d86e09c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 100%;
  flex: 0 48%;
  list-style: none;
  padding: 8px 5px;
  border: 1px dashed #eee;
  // width: 135px!important;
  min-height: 105px;
  background: #fcfcfd;
  margin-bottom: 10px;
  text-align: center;
  font-size: 11px;
  line-height: 21px;
  &__icon {
    color: #0d86e09c;
    font-size: 30px;
  }
  &__name {
    font-size: 14px;
    margin: 10px 0;
    color: #000;
  }
  &:hover {
    background: #f3f3f5;
    border-color: rgba(7, 25, 187, 0.514);
  }
}
</style>
