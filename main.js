import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uviewPlus, { setConfig } from 'uview-plus'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.use(uviewPlus)
app.$mount()
// 仅微信小程序生效
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif