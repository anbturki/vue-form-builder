<template>
  <div class="form-builder__represent">
    <FieldsSection
      v-for="section in sections"
      :key="section.key"
      :section="section"
      :moving="moving"/>
  </div>
</template>
<script>
import FieldsSection from '@/components/FieldsSection'
export default {
  components: { FieldsSection },
  name: 'FieldsRepresent',
  props: {
    moving: {
      type: Boolean
    },
    sections: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style'
</style>
