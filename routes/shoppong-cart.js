var express = require('express');
var router = express.Router();
var productModel=require('../modules/product_details');
var getAllProduct=productModel.find({});
var cartModel=require('../modules/cartDetails');
var path = require('path');
var fs = require('fs');
var userInfo;


router.get('/addProduct/:proName', function(req, res, next) {
var proName=req.params.proName;
console.log("proName "+proName);
var fetchData= productModel.findOne({product_name:proName});
  fetchData.exec(function(err,singleData){ 
    console.log(singleData); 
   // console.log("Auto generated ID"+req.session.orderId);
    console.log("username "+req.session.userLogin);
    var saveCartData=new cartModel({
      user_name:req.session.userLogin,
      product_image:singleData['product_image'],
      product_name:singleData['product_name'],
      product_price:singleData['product_price'],
      product_color:singleData['product_color'],
      product_size:singleData['product_size'],
      product_tags:singleData['product_tags']
      
    });
    saveCartData.save(function(err,pro){
      if(err) throw err;
      console.log(pro);
      var retreiveCartData=cartModel.find({user_name:req.session.userLogin});
      retreiveCartData.exec(function(err,cartData){
      res.render('shopping-cart',{cartData,userInfo});
});
    });
   
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  userInfo={username:req.session.userLogin}
var retreiveCartData=cartModel.find({user_name:req.session.userLogin});
retreiveCartData.exec(function(err,cartData){
  res.render('shopping-cart',{cartData,userInfo});
});
  
});

router.get('/proDelete/:proName', function(req, res, next) {
  var proName=req.params.proName;
  var removeCartData=cartModel.findOneAndDelete({product_name:proName});
  removeCartData.exec(function(err,cartData){
    var retreiveCartData=cartModel.find({user_name:req.session.userLogin});
    retreiveCartData.exec(function(err,cartData){
    res.render('shopping-cart',{cartData,userInfo});
});

});  
});



module.exports = router;
