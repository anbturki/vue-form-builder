<template>
  <div class="form-builder__fields-menu">
    <label>Basic Fields</label>
    <ul class="form-builder__fields-menu__items">
      <fields-menu-item @mousedown="mousedown" icon="title" name="Single Line"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="wrap_text" type="long_text" name="Multi Line"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="looks_3" type="number" name="Number"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="check_box" type="checkbox" name="Checkbox"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="list_alt" type="dropdown" name="Drop Down"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="format_list_numbered_rtl" type="multiselect" name="Multi Select"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="radio_button_checked" type="radio" name="Radio"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="today" type="date" name="Date"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="access_time" type="time" name="Time"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="call" type="phone" name="Phone"></fields-menu-item>
      <fields-menu-item @mousedown="mousedown" icon="attachment" type="attachment" name="Attachment"></fields-menu-item>
    </ul>
    <label>Advanced Fields</label>
    <ul class="form-builder__fields-menu__items">
      <fields-menu-item @mousedown="mousedown" icon="view_module" type="section" name="Section"></fields-menu-item>
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
      this.$emit('captureField', event)
    }
  }
}
</script>
<style lang="scss" scoped>
label {
  margin: 10px 10px 20px;
  display: block;
  font-weight: bold;
}
.form-builder {
  &__fields-menu {
    background: #F4F6FA;
    padding: 20px 0;
    width: 300px;
    position: fixed;
    left: 0;
    top: 0;
    min-height: 100%;
    &__items {
      margin: 0;
      display: flex;
      padding: 0 10px 10px 10px;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  }
</style>
