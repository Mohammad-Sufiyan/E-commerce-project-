
var express = require('express');
var router = express.Router();
var loginModel=require('../modules/login');
var orderDataModel=require("../modules/orderDetails");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{msg:'',userInfo:''});
});

router.post('/', function(req, res, next) {
  var username=req.body.username.toLowerCase();
  var password=req.body.password;
  console.log(username,password)

  var checkLogin=loginModel.countDocuments({$and:[{username:{$eq:username}},{password:{$eq:password}}]});
   checkLogin.exec(function(err,data){
    console.log(data);
if(data>0){
  //for retrieving existing order id
  var orderIdDatabase=orderDataModel.find({}).sort({$natural: -1}).limit(1);
orderIdDatabase.exec(function(err,result){
  console.log(result);
  //session setting for assigning unique id to each order 
  req.session.orderId=result[0].order_id+1;
  req.session.userLogin=username;
  console.log(req.session.orderId)
  res.redirect('/home');
  }); 
 
}else if(username=="admin" && password=="admin123"){
  req.session.adminLogin=username;
  res.redirect("/admin");
   }else{
  res.render('login',{msg:'Login Failed Successfully',userInfo:''});
}    
 });
 });

 router.get('/signout', function(req, res, next) {
  req.session.destroy(function(err) {})
  res.redirect('/')
});

module.exports = router;
