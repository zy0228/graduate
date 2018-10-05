<template>
  <div>
    <hxHeader></hxHeader>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>确认</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>地址确认</span></li>
          <li class="cur"><span>查看订单</span></li>
          <li class="cur"><span>支付</span></li>
          <li class="cur"><span>订单确认</span></li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="../assets/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>订单号：{{orderId}}</span>
            <span>总价：{{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link to="/goods" class="btn btn--m">商品列表</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link to="/cart" class="btn btn--m">购物车列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hxFooter></hxFooter>
  </div>
</template>

<script>
import axios from 'axios'
import hxHeader from '../components/hxHeader'
import hxFooter from '../components/hxFooter'

export default {
  data() {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  mounted() {
    this.getorder()
  },
  methods: {
    getorder() {
      let orderId = this.$route.query.userId
      if(!orderId) {
        console.log('no')
      }
      axios.get('/users/orderDetail',{params: {orderId: orderId}}).then(response => {
        let res = response.data
        if(res.status == 0) {
          this.orderId = orderId
          this.orderTotal  = res.result.orderTotal
        }
      })
    }
  },
  components: {
    hxHeader,
    hxFooter
  }
}
</script>

<style scoped>
</style>
