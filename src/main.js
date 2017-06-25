import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.config.productionTip = false

const store = {
  ready: false
}

Raven
  .config('https://428a62fb569045aebf3944b61b4724f4@sentry.io/183657')
  .addPlugin(RavenVue, Vue)
  .install()

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
