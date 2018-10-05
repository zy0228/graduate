var express = require('express');
var mongooes = require('mongoose');
var router = express.Router();
var goods = require('../model/goods');


mongooes.connect("mongodb://127.0.0.1:27017/graduate");

mongooes.connection.on('connected',() => {
  console.log('mongodb connected success!')
})

mongooes.connection.on('error', () => {
  console.log('mongodb connected fail.')
})

mongooes.connection.on('disconnected', () => {
  console.log('mongodb disconnected.')
})

//查询商品列表mongo数据 排序
router.get('/list',(req, res, next) => {
  let page = parseInt(req.param('page'));
  let pageSzie = parseInt(req.param('pageSize'));
  let sort = req.param("sort");
  let skip = (page - 1) * pageSzie;
  let parms = {};
  let priceChecked = req.param('priceChecked');
  var lte = '',gte = '';
  if(priceChecked != 'all'){
    switch (priceChecked) {
      case '0': gte = 0;lte = 2000;break;
      case '1': gte = 2000;lte = 5000;break;
      case '2': gte = 5000;lte = 20000;break;
    }
    parms = {
      prodcutPrice: {
        $gt: gte,
        $lt: lte
      }
    }
  }
  let goodModel = goods.find(parms).skip(skip).limit(pageSzie);
  goodModel.sort({"prodcutPrice": sort})
  goodModel.exec({}, (err,doc) => {
    if(err) {
      res.json({
        status: "1",
        msg: err.message
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

//添加购物车
router.post('/addCart',(req,res,next) => {
  var user = require('../model/cart')
  let userId = "31016101",productId = req.body.productId
  user.findOne({userId: userId}, (err, userDoc) => {
    if(err) {
      res.json({
        status: "1",
        msg: err.message
      })
    }else{
      console.log('userDoc:' + userDoc)
      if(userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach(item => {
          if(item.productId == productId) {
            goodsItem = item
            item.productNum++
          }
        })
        if(goodsItem) {
          userDoc.save((err, doc) => {
            if(err) {
              res.json({
                status: "1",
                msg: err.message,
                result: ''
              })
            }else{
              res.json({
                status: "0",
                msg: '',
                result: 'suc'
              })
            }
          })
        }else{
          goods.findOne({productId: productId}, (err1, doc) => {
            if(err1) {
              res.json({
                status: "1",
                msg: err1.message
              })
            }else{
              if(doc) {
                doc.checked = 1
                doc.productNum = 1
                userDoc.cartList.push(doc)
                userDoc.save((err2,doc2) => {
                  if(err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  }else{
                    res.json({
                      status: "0",
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }  
      }
    }
  })
})

module.exports = router;