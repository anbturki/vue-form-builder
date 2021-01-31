<template>
  <div class="app" :style="{cursor: moving ? 'move' : 'default', 'min-height': '100vh'}">
    <div class="form-builder">
      <fields-menu @mousedown="onMouseDownOnField" @selectedField="selectedField"></fields-menu>
      <!-- // menu -->
      <div class="fake-field" ref="fakeField" v-show="moving">
        <!-- <input type="text" disabled placeholder="enter a name"> -->
        <i class="material-icons">{{pickedField.icon}}</i> {{pickedField.title}}
      </div>
      <div class="form-builder__represent" :style="{width: fieldPropVisiblity ? '60%' : '80%'}">
        <div class="form-builder__represent__body" ref="preview" :class="{centeralize: !fieldPropVisiblity && !moving}">
          <div v-if="!fieldPropVisiblity && !moving" class="drag_and_drop">
            <img src="/images/drag.svg" />
            <p>Drag and drop a field here</p>
          </div>
          <transition-group tag="ul" style="padding: 0" name="slide-fade">
            <li v-for="(field, i) in fields"
              :key="field.pk"
              class="simulated-field"
              :class="{selected_field: field.pk === activeField.pk}"
              @click="activeField = field"
              @mouseover="onMouseOver">
              <div class="field-wrapper">
                <i class="material-icons">{{field.icon}}</i>
                <span class="field-name">{{field.title}}</span>
              </div>
              <span class="remove-field" v-if="field.pk === activeField.pk" @click="onDelete(i)">
                <i class="material-icons">delete</i>
              </span>
            </li>
          </transition-group>
          <div class="form-builder__represent__body__items__placeholder" ref="placeholder" v-if="showPlaceholder"></div>
        </div>
      </div>
      <transition name="slide">
        <field-properties
          :field="activeField"
          :class="{'field-properties-open': fieldPropVisiblity}"
          ></field-properties>
      </transition>
    </div>
  </div>
</template>
<script>
import FieldsMenu from '@/components/FieldsMenu'
import FieldProperties from '@/components/FieldProperties'
export default {
  components: { FieldsMenu, FieldProperties },
  data () {
    return {
      moving: false,
      isFiledFocus: false,
      fields: [],
      showPlaceholder: false,
      activeField: {},
      pickedField: {},
      fakeFieldInitPos: {
        left: 0,
        top: 0
      }
    }
  },
  mounted () {
    window.addEventListener('mouseup', (event) => {
      const { fakeField } = this.$refs
      if (this.showPlaceholder && this.moving) {
        this.fields.push(this.pickedField)
        this.activeField = this.pickedField
        fakeField.style.left = 'auto'
        fakeField.style.top = 'auto'
        this.moving = false
      } else {
        fakeField.style.left = `${this.fakeFieldInitPos.left - (fakeField.clientWidth / 2)}px`
        fakeField.style.top = `${this.fakeFieldInitPos.top}px`
        setTimeout(() => {
          fakeField.style.left = 'auto'
          fakeField.style.top = 'auto'
          this.moving = false
        }, 600)
      }
      this.isFiledFocus = false
      this.showPlaceholder = false
      window.removeEventListener('mousemove', this.draggingField)
    })
  },
  computed: {
    preview () {
      return this.$refs.preview
    },
    fieldPropVisiblity () {
      return !!Object.keys(this.activeField).length
    }
  },
  methods: {
    onMouseOver (event) {
      console.log(event)
    },
    onDelete (index) {
      this.fields.splice(index, 1)
      this.$nextTick(() => {
        this.activeField = this.fields[index - 1] || {}
      })
    },
    selectedField (field) {
      this.pickedField = field
    },
    onMouseDownOnField (event) {
      this.isFiledFocus = true
      this.fakeFieldInitPos = {
        left: event.clientX,
        top: event.clientY
      }
      window.addEventListener('mousemove', this.draggingField)
    },
    draggingField (event) {
      event.preventDefault()
      this.moving = true
      this.$nextTick(() => {
        if (this.preview === event.target || this.preview.contains(event.target)) {
          this.showPlaceholder = true
          this.$nextTick(() => {
            this.$refs.placeholder.style.width = '100%'
          })
        } else {
          this.showPlaceholder = false
        }
        const { fakeField } = this.$refs
        fakeField.style.position = 'absolute'
        fakeField.style.top = `${event.clientY}px`
        fakeField.style.left = `${event.clientX - (fakeField.clientWidth / 2)}px`
      })
    }
  }
}
</script>
