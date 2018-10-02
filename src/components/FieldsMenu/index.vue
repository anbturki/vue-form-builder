<template>
  <div class="form-builder__fields-menu">
    <label>Fields</label>
    <ul class="form-builder__fields-menu__items">
      <fields-menu-item @mousedown="mousedown" icon="text_fields" name="Single Line"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="text_fields" type="long_text" name="Multi Line"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="text_fields" type="number" name="Number"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="check_box" type="checkbox" name="Checkbox"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="text_fields" name="Multi Select"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="radio_button_checked" type="radio" name="Radio"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="today" type="date" name="Date"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="access_time" type="time" name="Time"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="call" type="phone" name="Phone"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="attachment" type="attachment" name="Attachment"></fields-menu-item>
    </ul>
  </div>
</template>
<script>
import FieldsMenuItem from './FieldsMenuItem'
export default {
  name: 'FieldsMenu',
  components: { FieldsMenuItem },
  methods: {
    mousedown (event) {
      this.$emit('mousedown', event.event)
      delete event.event
      this.$emit('selectedField', event)
    }
  }
}
</script>
<style scopped>
label {
  margin: 10px 10px 20px;
  display: block;
  font-weight: bold;
  color: #000;
}
</style>
