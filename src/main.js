// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// Vuex
import store from './store'

import router from './router'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

// ElementUI
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })
Vue.use(Element, { size: 'small' })

// 自定义插件
import Plugin from './plugin'

// 自定义插件
Vue.use(Plugin)

// global css
import '@/styles/index.scss'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
