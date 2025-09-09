import App from './App'
import GlobalPlayer from './components/GlobalPlayer'

// // #ifndef VUE3
// console.log(222)
// import Vue from 'vue'
// import './uni.promisify.adaptor'
// import uviewPlus, {
// 	setConfig
// } from 'uview-plus'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
// 	...App
// })
// app.use(uviewPlus)
// Vue.component('GlobalPlayer', GlobalPlayer)
// app.$mount()
// // 仅微信小程序生效
// // #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

import { createPinia } from 'pinia'

export function createApp() {
	const app = createSSRApp(App)
	app.use(createPinia())
	app.component('GlobalPlayer', GlobalPlayer)
	return {
		app
	}
}
// #endif