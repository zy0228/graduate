var express = require('express');
var router = express.Router();
var user = require('../model/cart')
require('../until')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *login
 */
router.post('/login', (req, res, next) => {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  let params = {
    userName: userName,
    userPwd: userPwd
  }
  user.findOne(params, (err,doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    }else{
      if(doc) {
        res.cookie('userId',doc.userId,{
          path: '/',
          maxAge: 3000*60*60
        })
        res.cookie('userName',doc.userName,{
          path: '/',
          maxAge: 1000*60*60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }else {
        res.json({
            status:'1',
            msg:'账号密码错误',
            result:''
        });
      }
    }
  })
})  

/**
 *loginOut
 */
router.post('/loginOut', (req, res, next) => {
  res.cookie('userId','', {
    path: '/',
    maxAge: -1
  })
  res.cookie('userName','', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: 'suc'
  })
})

router.get('/checkLogin',(req, res, next) => {
  if(req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  }else{
    res.json({
      ststus: '1',
      msg: '未登录',
      result: ''
    })
  }
})

//获取购物车列表
router.get('/cart',(req, res, next) => {
  let userId = req.cookies.userId
  if(userId) {
    user.findOne({userId: userId}, (err,doc) => {
      if(err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        if(doc) {
          res.json({
            status: '0',
            msg: '',
            result: doc.cartList
          })
        }
      }
    })
  }
})
//删除
router.post('/del', (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  user.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    }else{
      if(doc) {
        res.json({
          status: '0',
          msg: '',
          result: 'suc'
        })
      }
    }
  })
})

//修改商品数量和选中情况
router.post('/editCart', (req, res, nxt) => {
  let userId = req.cookies.userId
  let productNum = req.body.productNum
  let productId = req.body.productId
  let checked = req.body.checked
  user.update({userId: userId, 'cartList.productId': productId},{'cartList.$.productNum': productNum,'cartList.$.checked': checked}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        res.json({
          status: '0',
          msg: '',
          result:'suc'
        })
      }
    }
  })
})

//全选操作
router.post('/editCheckall', (req, res, next) => {
  let checkall = req.body.checkall?1:0
  let userId = req.cookies.userId
  user.findOne({userId: userId}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        doc.cartList.forEach(element => {
          element.checked = checkall
        })
        doc.save((err1, doc1) => {
          if(err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          }else{
            res.json({
              status: '0',
              msg:'',
              result:'suc'
            })
          }
        })
      }
    }
  })
})

//查询i用户地址接口
router.get('/address', (req, res, next) => {
  let userId = req.cookies.userId
  user.findOne({userId: userId}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.addressInfo
        })
      }
    }
  })
})

//设置默认地址 接口
router.post('/setaddressDefault', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  if(!addressId) {
    res.json({
      status: '1003',
      msg: 'address undefind',
      result: ''
    })
  }
  user.findOne({userId: userId}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        let addressInfo = doc.addressInfo
        addressInfo.forEach(item => {
          if(item.addressId == addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
        doc.save((err1, doc1) => {
          if(err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result:''
            })
          }else{
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
})

//删除地址
router.post('/delAddress', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  user.update({userId: userId}, {$pull: {'addressInfo': {'addressId': addressId}}}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

//支付
router.post('/pay', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  let orderTotal = req.body.orderTotal

  user.findOne({userId: userId}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      let address = ''
      let goodsList = []
      doc.addressInfo.forEach(item => {
        if(item.addressId == addressId) {
          address = item
        }
      })

      doc.cartList.forEach(item => {
        if(item.checked == 1){
          goodsList.push(item)
        }
      })

      let platform = '028'
      let r1 = Math.floor(Math.random()*10)
      let r2 = Math.floor(Math.random()*10)
      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      let orderId = platform+r1+sysDate+r2

      let orderList = {
        orderId:orderId,
          orderTotal:orderTotal,
          addressInfo:address,
          goodsList: goodsList,
          orderStatus:'1',
          createDate:createDate
      }

      doc.orderList.push(orderList)
      doc.save((err1, doc1) => {
        if(err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        }else{
          if(doc1) {
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId:orderList.orderId,
                orderTotal:orderList.orderTotal
              }
            })
          }
        }
      })
    }
  })
})

//订单信息
router.get('/orderDetail',(req, res, next) => {
  let orderId = req.param('orderId')
  let userId = req.cookies.userId
  user.findOne({userId: userId}, (err, userInfo) => {
    if(err) {
      res.json({
        status: '1',
        mes: err.message,
        result: ''
      })
    }else{
      let orderList = userInfo.orderList
      if(orderList.length > 0) {
        let orderTotal = 0
        orderList.forEach(item => {
          if(item.orderId == orderId) {
            orderTotal = item.orderTotal
          }
        })
        if(orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        }else{
          res.json({
            status: '12001',
            msg: '无此订单',
            result:''
          })
        }
      }else{
        res.json({
          status: '12002',
          msg: '当前未创建订单',
          result:''
        })
      }
    }
  })
})
module.exports = router;