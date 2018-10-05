db.getCollection("users").find({})
db.getCollection("users").insertOne({
  "userId": "31016101",
  "userName": "uzi",
  "userPwd": "123456",
  "orderList": [
    {
      "orderId": "6224201705302250301",
	  "orderTotal": 3359,
      "addressInfo":{
        "addressId": "100001",
        "userName": "张铁柱",
        "streetName": "淮安信息",
        "postCode": 100001,
        "tel": 12345678,
        "isDefault": true
      },
      "goodsList": [{
		"productImage":"https://res.vmallrescom/pimages//product/2601010009806/group//800_800_1518318921484.jpg",
		"prodcutPrice": "3999",
		"productName": "HUAWEI Mate 10 Pro",
		"productId": "10002",
		"productNum": 1,
		"checked": 1
	  }],
      "orderStatus": "1",
	  "createDate": "2018-05-30 22:50:30"
    }
  ],
  "cartList": [{
     "prodcutImg": "https://res.vmallres.com/pimages//product/6901443200115/group//800_800_1507794815666.jpg",
	 "prodcutPrice": "3399.0",
	 "productName": "HUAWEI Mate 10",
	 "productId": "10001",
	 "productNum": 6,
	 "checked": 1
	}],
  "addressInfo": [{
    "addressId": "1001",
    "userName":"张耀",
    "streetName":"淮安市青浦区信息学院",
    "postCode":1001,
    "tel":12345678,
    "isDefault":true
  },
  {
	"addressId": "1001",
	"userName": "7京",
	"streetName": "淮安师范大学",
	"postCode": "1005",
	"tel": 87654321,
	"isDefault": false
  }]
})