var express = require('express');
var router = express.Router();
var currentDateTime=new Date();
var orderDataModel=require('../modules/orderDetails')
var getAllOrder=orderDataModel.find({});
var orderdProductModel=require('../modules/orderdProduct');
var cartModel=require('../modules/cartDetails');
var path = require('path');
var fs = require('fs');
var userInfo;
var now =currentDateTime.getDate()+"-"+(currentDateTime.getMonth()+1)+"-"+currentDateTime.getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  userInfo={username:req.session.userLogin}
  var retreiveCartData=cartModel.find({user_name:req.session.userLogin});
retreiveCartData.exec(function(err,cartData){
  res.render('check-out',{cartData,userInfo});
});
});

router.post('/', function(req, res, next) {
  var fir=req.body.fir;
  var last=req.body.last;
  var country=req.body.country;
  var address=req.body.address;
  var pinCode=req.body.pinCode;
  var city=req.body.city;
  var email=req.body.email;
  var phone=req.body.phone;
  var paymentMethod=req.body.paymentMethod;
  var phone=req.body.phone;
  var placeOrder=req.body.placeOrder;

  var cartLength=req.body.cartLength;
 
  if(placeOrder){
    for(i=1;i<=parseInt(cartLength);i++){
     var insertProduct=new orderdProductModel({
      order_id:req.session.orderId,
      product_name:req.body['orderProName'+i],
      product_total:req.body['orderProTotal'+i],

     });
     insertProduct.save(function(err,data){

     });
    }


  var insertOrder=new orderDataModel({
    order_date:now,
    order_id:req.session.orderId,
    user_name:req.session.userLogin,
    full_name:fir+" "+last,
    country:country,
    address:address,
    pincode:pinCode,
    city:city,
    email_id:email,
    contact:phone,
    payment_method:paymentMethod,
    order_status:'Pending'
  });
  insertOrder.save(function(err,data){
    if(err) throw err;
res.redirect('/home');
  });
}else{
  console.log('else condition is true')
  res.redirect('/home');

}
});




module.exports = router;
