<template>
  <div>
    <hxHeader></hxHeader>
    <hxBread>
      <span>商品列表</span>
    </hxBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排列顺序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">筛选条件</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)">全部</a></dd>
              <dd v-for="(item, index) in priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setpricefilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="item.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll ="loadMore" infinite-scroll-disabled ="busy" infinite-scroll-distance ="10">
                <img src="../assets/loading-svg/loading-spokes.svg" alt="" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cartModal :mdshow="mdshow" v-on:close="closeModal">
      <p slot="message">您尚未登陆</p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdshow = false">关闭</a>
      </div>
    </cartModal>
    <cartModal :mdshow="mdshowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdshowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;"  to="/cart">查看购物车</router-link>
      </div>
    </cartModal>
    <hxFooter></hxFooter> 
  </div>
</template>

<script>
import hxHeader from '../components/hxHeader'
import hxFooter from '../components/hxFooter'
import hxBread from '../components/hxBread'
import cartModal from '../components/cartModal'
import axios from 'axios'

export default {
  data() {
    return {
      goodsList: [],
      sort: true,
      page:1,
      pageSize:8,
      busy: false,
      loading: true,
      mdshow: false,
      mdshowCart: false,
      priceFilter: [
        {
          startPrice: 0,
          endPrice: 2000
        },
        {
          startPrice: 2000,
          endPrice: 5000
        },
        {
          startPrice: 5000,
          endPrice: 20000
        }
      ],
      priceChecked:'all',
    }
  },
  mounted() {
    this.getGoods(false)
  },
  methods: {
    getGoods(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort?1:-1,
        priceChecked: this.priceChecked
      }
      this.loading = true
      axios.get('/goods/list',{params: param}).then(res => {
        let response = res.data;
        this.loading = false;
        if(response.status == "0") {
          if(flag) {
            this.goodsList = this.goodsList.concat(response.result.list)
            if(response.result.count == 0) {
              this.busy = true
            }else{
              this.busy = false
            }
          }else{
            this.goodsList = response.result.list;
            this.busy = false
          }
        }
      }).catch(error => {
        console.error(error)
      })
    },
    sortGoods() {
      this.sort =! this.sort;
      this.page = 1;
      this.getGoods()
    },
    loadMore() {
      this.busy = true
      setTimeout(() => {
        this.page++;
        this.getGoods(true)
      }, 600);
    },
    setpricefilter (index) {
      this.page = 1;
      this.priceChecked = index;
      this.getGoods()
    },
    addCart(productId) {
      axios.post('/goods/addCart', {
        productId: productId
      }).then((res) => {
        if(res.data.status == "0") {
          this.mdshowCart = true
        }else{
          this.mdshow = true
        }
      })
    },
    closeModal(){
      this.mdshow = false;
      this.mdshowCart = false;
    },
  },
  components: {
    hxHeader,
    hxBread,
    hxFooter,
    cartModal
  }
}
</script>

<style scoped>
  .icon-arrow-short{
    color: black
  }
</style>
