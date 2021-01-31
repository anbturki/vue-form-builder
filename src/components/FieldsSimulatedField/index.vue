<template>
  <li
    @mouseover.stop
    class="simulated-field">
    <div class="field-wrapper">
      <i class="material-icons">{{field.icon}}</i>
      <span class="field-name">{{field.title}}</span>
    </div>
    <span class="remove-field" v-show="ShowDelete" @click="$emit('showDeleteDialog')">
      <i class="material-icons">delete</i>
    </span>
  </li>
</template>
<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    ShowDelete: {
      type: Boolean,
      default: false
    }
  }
}
</script>
