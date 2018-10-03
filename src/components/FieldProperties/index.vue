<template>
  <div class="field-properties">
    <div class="title">Field Properties</div>
    <div class="field-properties-form">
      <label>Name</label>
      <input type="text" v-model="field.name">
    </div>
    <div class="field-properties-form">
      <label>Default value</label>
      <input type="text" v-model="field.value">
    </div>
    <div class="field-properties-form" v-if="field.type === 'radio' || field.type === 'checkbox' ">
      <label>Choices</label>
      <div class="field-properties-form" v-for="(choice, index) in field.choices" :key="index">
        <input type="checkbox" style="width: 10%;">
        <input type="text" :value="choice" style="width: 80%">
      </div>
    </div>
    <div class="field-properties-form">
      <label>Description</label>
      <textarea rows="5"></textarea>
    </div>
    <div class="field-properties-form checkbox">
      <label>Required</label>
      <input type="checkbox">
    </div>
    <div class="field-properties-form">
      <label>Key</label>
      <input type="text" v-model="field.key" class="disabled" disabled>
    </div>
    <div class="field-properties-form">
      <label>Field Type</label>
      <input type="text" v-model="field.type" class="disabled" disabled>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FieldProperties',
  props: {
    field: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.field-properties {
  &-form{
  padding:0 10px;
  margin: 15px 0;
  label {
    margin: 0 0 5px;
    font-weight: normal;
  }
  input, textarea {
    border: none;
    border: 1px solid #ccc;
    width: 100%;
    padding: 10px;
    min-height: 40px;
    font-size: 16px;
    box-shadow: none;
    &.disabled {
      background: #e8e8e8ad !important;
      cursor: not-allowed;
    }
    &:focus {
      border: 1px solid #3987d9;
      outline: none;
    }
  }
  &.checkbox {
    display: flex;
    align-items: center;
    input {
      width: 30px !important;
      min-height: auto;
      padding: 0;
      margin: 0 10px;
    }
    label {
      margin: 0
    }
  }
  }
}
.title {
  margin: 10px 10px 30px;
  display: block;
  font-weight: bold;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}
</style>
