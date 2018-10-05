var mongooes = require('mongoose')
var Schema = mongooes.Schema;

var product = new Schema({
  "productId": String,
  "productName": String,
  "prodcutPrice": Number,
  "prodcutImg": String,
  "checked":String,
  "productNum":Number
})

module.exports = mongooes.model("good", product);