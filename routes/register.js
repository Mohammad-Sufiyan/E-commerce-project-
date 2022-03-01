var express = require('express');
var router = express.Router();
var loginModel=require('../modules/login');
const { find } = require('../modules/login');
var findLoginModel=loginModel.find({});
/* GET home page. */

router.get('/', function(req, res, next) {

res.render('register',{msg:'',userInfo:''});
 

});

router.post('/', function(req, res, next) {
var name=req.body.name;
var contact=req.body.contact;
var username=req.body.username.toLowerCase();
var pass=req.body.pass;
var con_pass=req.body.con_pass;
if(pass!=con_pass){
  res.render('register',{msg:"Your Password Not Mached From Confirm Password",userInfo:''});
}else{
loginDetails=new loginModel({
  name:name,
  contact:contact,
  username:username,
  password:pass,
});
loginDetails.save(function(err,data){
if(err) throw err;
console.log(data);
res.render('login',{msg:'Registered Successfully',userInfo:''});
});
}  
});


module.exports = router;
