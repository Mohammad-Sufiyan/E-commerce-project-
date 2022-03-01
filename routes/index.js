
var express = require('express');
var router = express.Router();
var productModel=require('../modules/product_details');
var getAllProduct=productModel.find({});
var userInfo;
// /* GET home page. */
// router.get('/:proCat/:proTag', function(req, res, next) {
// var proCat=req.params.proCat;
// var proTag=req.params.proTag;
//   var retreiveProData=productModel.find({$and:[{product_category:{$eq:proCat}},{product_tags:{$eq:proTag}},{product_type:{$eq:'Featured'}}]});
//   retreiveProData.exec(function(err,featureProData){
//     res.render('index',{featureProData,userInfo});
//   });
// });

router.get('/', function(req, res, next) {
   userInfo={username:req.session.userLogin}

    var retreiveProData=productModel.find({$and:[{product_type:{$eq:'Featured'}},{product_tags:{$eq:'Cloth'}}]});
    retreiveProData.exec(function(err,featureProData){
      console.log(featureProData);
      res.render('index',{featureProData,userInfo});
    });
  });

module.exports = router;