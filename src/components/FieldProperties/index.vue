<template>
  <div class="field-properties" :class="{'field-properties-open': IsOpen}">
    <div class="title">Field Properties</div>
    <div class="form-row">
      <label>Name</label>
      <input type="text" v-model="field.title">
    </div>
    <div class="form-row" v-if="field.type !== 'section'">
      <label>Default value</label>
      <input type="text" v-model="field.value">
    </div>
    <Choices v-if="field.type === 'choices'" :field="field"/>
    <div class="form-row">
      <label>Description</label>
      <textarea rows="5"></textarea>
    </div>
    <div class="form-row checkbox" v-if="field.type !== 'section'">
      <label>Required</label>
      <input type="checkbox" v-model="field.required">
    </div>
    <div class="form-row checkbox" v-else>
      <label>Show header</label>
      <input type="checkbox" v-model="field.showHeader">
    </div>
    <div class="form-row">
      <label>Key</label>
      <input type="text" v-model="field.pk" class="disabled" disabled>
    </div>
    <div class="form-row">
      <label>Field Type</label>
      <input type="text" v-model="field.type" class="disabled" disabled>
    </div>
  </div>
</template>
<script>
import Choices from './Choices'
export default {
  components: { Choices },
  name: 'FieldProperties',
  props: {
    field: {
      type: Object,
      required: true
    },
    IsOpen: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.field-properties {
  background: #fbfbfb;
  border-left: 1px solid #e8e8e8;
  padding: 20px 10px;
  width: 250px;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  transform: translateX(105%);
  transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  &-open {
    transform: translate(0);
  }
.title {
  margin: 10px 10px 30px;
  display: block;
  font-weight: bold;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}
}
</style>
