import Vue from 'vue'
import Router from 'vue-router'
import goodsList from './views/goodsList.vue'
import cart from './views/cart.vue'
import address from './views/address.vue'
import confirmOrder from './views/orderConfirm.vue'
import orderSuc from './views/orderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/goods',
      component: goodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path:'/address',
      name: 'address',
      component: address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: confirmOrder
    },
    {
      path:'/orderSuc',
      name: 'orderSuc',
      component: orderSuc
    }
  ]
})
