import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

const store = {
  ready: false
}

Vue.use(VueAnalytics, {
  id: 'UA-78783837-2',
  // debug: {
  //   enabled: true,
  //   trace: false,
  //   sendHitTask: true
  // },
  onReady () {
    store.ready = true
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  data: store
})
