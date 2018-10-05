import Vue from 'vue'
import App from './App.vue'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false
import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/checkout.css'
import './assets/css/login.css'

import lazyLoad from 'vue-lazyload'
Vue.use(lazyLoad, {
  preLoad: 1.3,
  loading: './assets/loading-svg/loading-spinning-bubbles.svg'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
