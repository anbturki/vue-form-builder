<template>
  <div
    class="form-builder__section"
    v-section="mouseMove"
    ref="section"
    :class="{active: mouseOver}"
    @mouseover="mouseOver = true"
    @mouseout="mouseOver = false">
    <div class="form-builder__section__header">
      <p>{{section.name}}</p>
    </div>
    <div class="form-builder__section__fields" @mouseover.stop>
      <transition-group tag="ul" style="padding: 0" name="slide-fade">
        <li v-for="field in section.questions"
          :key="field.key"
          class="simulated-field">
          <div class="field-wrapper">
            <i class="material-icons">{{field.icon}}</i>
            <span class="field-name">{{field.name}}</span>
          </div>
          <!-- <span class="remove-field" v-if="field.key === activeField.key" @click="onDelete(i)">
            <i class="material-icons">delete</i>
          </span> -->
        </li>
      </transition-group>
      <!-- <p v-for="question in section.questions" :key="question.key">{{question.name}}</p> -->
    </div>
    <div class="form-builder__section__placeholder" ref="placeholder" v-if="placeholderVisiblity"></div>
  </div>
</template>
<script>
import EventBus from '@/EventBus'
export default {
  name: 'FieldsSection',
  props: {
    section: {
      type: Object,
      required: true
    },
    moving: {
      type: Boolean
    }
  },
  data () {
    return {
      placeholderVisiblity: false,
      mouseOver: false
    }
  },
  mounted () {
    EventBus.$on('updatePlaceholder', (status) => {
      this.$nextTick(() => {
        this.placeholderVisiblity = false
      })
    })
  },
  methods: {
    mouseMove (event) {
      if (this.moving) {
        this.placeholderVisiblity = true
        this.$nextTick(() => {
          EventBus.$emit('activePlaceholder', { status: this.placeholderVisiblity, section: this.section.key })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-builder__section{
  transition: all .2s ease-in-out;
  box-sizing: border-box;
  padding: 10px;
  border: 2px dotted;
  border-color: transparent;
  &.active {
    background: #f4f9ff;
    border-color: #3986d941;
  }
  &__placeholder {
    border: 2px dotted rgb(7, 25, 187);
    height: 50px;
    background-color: #F4F6FA;
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
