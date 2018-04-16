import Vue from 'vue'
import AppLayout from './theme/Layout.vue'
import router from './router'

const app = new Vue({
  // ...AppLayout
  router,
  render: h => h(AppLayout)
})

export { app, router }
