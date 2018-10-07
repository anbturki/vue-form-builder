import Vue from 'vue'
import App from './App.vue'
import '@/assets/scss/app.scss'
Vue.config.productionTip = false

let mouseMove
Vue.directive('section', {
  bind (el, binding, vNode) {
    mouseMove = function (event) {
      if (el === event.target || el.contains(event.target)) {
        vNode.context[binding.expression](event, vNode.context)
      } else {
        vNode.context.placeholderVisiblity = false
      }
    }
    window.addEventListener('mousemove', mouseMove)
  },
  unbind () {
    window.removeEventListener('mousemove', mouseMove)
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
