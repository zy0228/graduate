
const mongooes = require('mongoose');

let catSchema = new mongooes.Schema(
  {
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
      {
        "productId":String,
        "productName":String,
        "prodcutPrice":String,
        "prodcutImg":String,
        "checked":Number,
        "productNum":Number
      }
    ],
    "addressInfo":[
      {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
      }
    ]
  }
)

module.exports = mongooes.model('user', catSchema)