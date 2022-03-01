
var express = require('express');
var router = express.Router();
var productModel=require('../modules/product_details');
var getAllProduct=productModel.find({});
var orderDataModel=require('../modules/orderDetails');
var stateChange,userInfo;
/* GET home page. */

router.get('/:cat?', function(req, res, next){ 
  userInfo={username:req.session.userLogin}
  var cat=req.params.cat?req.params.cat:"gents";
  var options={
    offset:  1,
    limit:  9
  };
  stateChange=1;
  
productModel.paginate({product_category:cat},options).then(function(result){
 
console.log(result.docs)
  res.render('shop', { recordChangeIndicater:stateChange,
   records: result.docs,
  current: result.offset,
  result:result.total,
  pages: Math.ceil(result.total / result.limit),
  userInfo:''

});
});
});



router.post('/', function(req, res, next){ 
  var category= req.body.category?'kids':'kids';
  var brand=req.body.brand?'Diesel':'Diesel';
  var price=req.body.price;
  var color=req.body.color?'Black':'Black';
  var size=req.body.size?'L':'L';
  var tags=req.body.tags?'Cloth':'Cloth';
  var sizeUpper=size.toUpperCase();
  console.log(category+brand+price+color+size+tags+sizeUpper)

var  Size=req.body.Size;
var Tag=req.body.Tag;


var array=price.split(" ");
  var a=array[0];
  var fromPrice=parseInt(a);
  var toPrice=parseInt(array[2]);
  var options={
    offset:  1,
    limit:  9
  };
  stateChange++;


  //retrieving selected item
  var posNumber=req.body.pos;
var name="name".concat(posNumber);
var posData=req.body[name];
console.log("position id"+posData);
if(posData!=null){
  var orderData=productModel.findOne({_id:posData});
  orderData.exec(function(err,data){
    if(err) throw err;
    console.log("order data retrieved"+data);
    console.log("last orderId through session "+req.session.orderId);
    if(data){
      var orderId=1;
      var productName=data.product_name;
      var productCategory=data.product_category;
      var productBrand=data.product_brand;
      var productPrice=data.product_price;
      var productColor=data.product_color;
      var productSize=data.product_size;
      var productTags=data.product_tags;
      var insertOrder=new orderDataModel({
    order_id:orderId,
    product_name:productName,
    product_category:productCategory,
    product_brand:productBrand,
    product_price:productPrice,
    product_color:productColor,
    product_size:productSize,
    product_tags:productTags,
    
  });
  insertOrder.save(function(err,doc){
    if(err) throw err;
console.log("order data save in order table"+doc);
  });

    }

  });
}

//retreiving end
 
 
 productModel.paginate({
    $or:[
    {$and:[
      {product_category:{$eq:category}},{product_brand:{$eq:brand}},{product_color:{$eq:color}},{product_size:{$eq:sizeUpper}},{product_tags:{$eq:tags}}
    ] }
   
  ]
},options).then(function(result){

 console.log(result); 

  res.render('shop', {recordChangeIndicater:stateChange, 
   records: result.docs,
  current: result.offset,
  total:result.total,
  pages: Math.ceil(result.total / result.limit),
  userInfo
});
});
});

router.get('/pegination/:page', function(req, res, next) {
  var category=req.body.category;
  var brand=req.body.brand;
  var price=req.body.price;
  var color=req.body.color;
  var size=req.body.size;
  var tags=req.body.tags?"cloth":"cloth";
  var perPage= 9;
  stateChange=0;

  var page= req.params.page || 1;
getAllProduct.skip((perPage * page) - perPage)
.limit(perPage).exec(function(err,data){
  if(err) throw err;
  
  productModel.countDocuments({}).exec((err,count)=>{
  res.render('shop', {recordChangeIndicater:stateChange, 
   records: data,
  current: page,
  pages: Math.ceil(count / perPage),
  userInfo:''
});
});
});
  }); 




module.exports = router;
