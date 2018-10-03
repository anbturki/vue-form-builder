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
    /**
     * Executed when mouse is down over the menu item.
     * It emits mouse event to Menu Wrapper component.
     * @method onMouseDownOnField
     * @param {MouseEvent} event
     */
    onMouseDownOnField (event) {
      let choices = [
        'Choice 1',
        'Choice 2',
        'Choice 3'
      ]
      this.$emit('mousedown', {
        name: this.name,
        icon: this.icon,
        type: this.type,
        value: '',
        key: '_' + Math.random().toString(36).substr(2, 9),
        event,
        choices
      })
    }
  }
}
</script>
