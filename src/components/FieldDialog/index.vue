<template>
<div class="field-dialog">
  <div class="field-dialog__modal">
  <div class="field-dialog__modal__header">
    <h4>Delete Field</h4>
  </div>
  <div class="field-dialog__modal__content">
    Are you sure you want to delete this field?
  </div>
  <div class="field-dialog__modal__actions">
    <button type="button" class="button button-yes" @click="$emit('yes')">Yes</button>
    <button type="button" class="button button-cancel" @click="$emit('cancel')">cancel</button>
  </div>
</div>
</div>
</template>
<style lang="scss" scoped>
@import 'style'
</style>
