<template>
  <div class="form-row">
    <label>Choices</label>
    <transition-group name="slide-fade" mode="out-in">
      <div class="form-row" v-for="(choice, index) in field.choices" :key="index">
        <input
          v-model="field.value"
          :type="field.multi_select ? 'checkbox' : 'radio'"
          :value="choice.title + (index + 1)" style="width: 10%;">
        <input type="text" :value="choice.title + (index + 1)" style="width: 50%">
        <span @click="addItem(index)">+</span> <span @click="removeItem(index)">-</span>
      </div>
    </transition-group>
    <span @click="addItem(0)" v-if="!field.choices.length">+</span>
  </div>
</template>
<script>
export default {
  name: 'Choices',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  methods: {
    addItem (index) {
      this.field.choices.splice(index + 1, 0, 'Choice')
    },
    removeItem (index) {
      this.field.choices.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-row span {
  margin: 0 10px;
  cursor: pointer
}
</style>
