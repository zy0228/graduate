<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__region">
            <span>Region</span>
            <select class="footer__region__select">
              <option value="en-US">USA</option>
              <option value="zh-CN">China</option>
              <option value="in">India</option>
            </select>
          </div>
          <div class="footer__secondary__nav">
            <span>Copyright © 2017 IMooc All Rights Reserved.</span>
            <a href="http://us.lemall.com/us/aboutUs.html">
              About Us
            </a>
            <a href="http://us.lemall.com/us/termsofUse.html">
              Terms &amp; Conditions
            </a>
            <a href="http://us.lemall.com/us/privacyPolicy.html">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
  .bread{
      max-width: 1280px;
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: #f5f7fc;
      margin: 0 auto;
  }
  .bread-wrap{
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
    margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
      margin-left: 10px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>
