<template>
  <div class="fake-field" ref="fakeField" v-if="value">
    <i class="material-icons">{{field.icon}}</i> {{field.name}}
  </div>
</template>

<script>
import EventBus from '@/EventBus'
export default {
  name: 'FieldsDragger',
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      startCoordinates: {
        left: 0,
        top: 0
      },
      showingPlaceholder: false,
      sectionKey: ''
    }
  },
  mounted () {
    EventBus.$on('activePlaceholder', ({ status, section }) => {
      this.showingPlaceholder = status
      this.sectionKey = section
    })
    window.addEventListener('mouseup', (event) => {
      window.removeEventListener('mousemove', this.draggingField)
      console.log(this.value, this.showingPlaceholder)
      const { fakeField } = this.$refs
      if (this.value && this.showingPlaceholder) {
        fakeField.style.left = 'auto'
        fakeField.style.top = 'auto'
        EventBus.$emit('upadeMoving', false)
        EventBus.$emit('pushFeild', this.sectionKey)
      } else if (this.value) {
        fakeField.style.left = `${this.startCoordinates.left - (fakeField.clientWidth / 2)}px`
        fakeField.style.top = `${this.startCoordinates.top}px`
        setTimeout(() => {
          fakeField.style.left = 'auto'
          fakeField.style.top = 'auto'
          this.$emit('input', false)
        }, 600)
      }
      EventBus.$emit('updatePlaceholder', false)
      this.showingPlaceholder = false
    })
    EventBus.$on('fieldPicked', (event) => {
      this.startCoordinates.top = event.clientY
      this.startCoordinates.left = event.clientX
      window.addEventListener('mousemove', this.draggingField)
    })
  },
  methods: {
    draggingField (event) {
      event.preventDefault()
      this.$emit('input', true)
      this.$nextTick(() => {
        const { fakeField } = this.$refs
        fakeField.style.position = 'absolute'
        fakeField.style.top = `${event.clientY + 5}px`
        fakeField.style.left = `${event.clientX - (fakeField.clientWidth / 2)}px`
      })
    }
  }
}
</script>
