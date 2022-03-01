var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var multer=require('multer');
var productModel=require('../../modules/product_details');
var getAllProduct=productModel.find({});
var orderDataModel=require('../../modules/orderDetails');
var getAllOrders=orderDataModel.find({});
var orderdProductModel=require('../../modules/orderdProduct');
var currentDateTime=new Date();
var currentDate=currentDateTime.getDate()+"-"+(currentDateTime.getMonth()+1)+"-"+currentDateTime.getFullYear();
var userInfo,orderData,alreadyExistFilePath;
var Storage = multer.diskStorage({
  destination:"./public/images/products/",

  filename: (req, files, cb) => {
      cb(null, req.body.proName.substr(0) + "_" + files.fieldname + "_" + path.extname(files.originalname));
  },
});


var upload = multer({
  storage: Storage
}).single('proImage');



/* GET home page. */
router.get('/', function(req, res, next) {
   userInfo={adminUser:req.session['adminLogin']};
  getAllOrders.exec(function(err,Data){
    orderData=Data
  getAllProduct.exec(function(err,proData){ 
    orderData[0]['orderStatus']="Total";
    res.render('./admin/adminMain',{proData,singleData:'',userInfo,orderData,singleProData:''});
  });
  });
});
  

  router.get('/edit/:proName', function(req, res, next) {
    var proName=req.params.proName; 
    var fetchData= productModel.findOne({product_name:proName});
    fetchData.exec(function(err,singleData){  
      console.log(singleData);
      alreadyExistFilePath=singleData['product_image'] 
      res.render('./admin/adminMain',{ proData:'', singleData,userInfo:'',orderData:'',singleProData:'' });
    });
    });

   
router.post('/',upload, function(req, res, next) {
  console.log(req.file)

  var proName=req.body.proName;
  var proDesc=req.body.proDesc;
  var proPrice=req.body.proPrice;
  var proCat=req.body.proCat.toLowerCase();
  var proBrand=req.body.proBrand;
  var proColor=req.body.proColor;
  var proSize=req.body.proSize;
  var proTag=req.body.proTag;
  var proStock=req.body.proStock;
  var proType=req.body.proType;
  var proImagePath=req.file?req.file.path:alreadyExistFilePath;
  var addPro=req.body.addPro;
  var id=req.body.proID;
  console.log(proImagePath)

  if(addPro){

  console.log("condition true");
  var insertProduct=new productModel({
  product_name:proName,
  product_description:proDesc,
  product_category:proCat,
  product_brand:proBrand,
  product_price:proPrice,
  product_color:proColor,
  product_size:proSize,
  product_tags:proTag,
  product_stock:proStock,
  product_type:proType,
  product_image:proImagePath
});
insertProduct.save(function(err,pro){
  if(err) throw err;
  console.log(pro);
  res.redirect('/admin')
});


  }else{
    productModel.findByIdAndUpdate(id,{
  
      product_name:proName,
  product_description:proDesc,
  product_category:proCat,
  product_brand:proBrand,
  product_price:proPrice,
  product_color:proColor,
  product_size:proSize,
  product_tags:proTag,
  product_stock:proStock,
  product_type:proType,
  product_image:proImagePath
    }).exec(function(err){
      if(err) throw err;
      res.redirect('/admin') 

  });

}
});

 /* GET home page. */
 router.get('/delete/:proName', function(req, res, next) {
  var proName=req.params.proName; 
  var fetchData= productModel.findOneAndDelete({product_name:proName});
  fetchData.exec(function(err,singleData){  
    res.redirect('/admin')
  });
  });  

  

    router.get('/orders/:orderStatus', function(req, res, next) {
     orderStatus=req.params.orderStatus;
        if(orderStatus=='Daily'){
          var retreivOrderData=orderDataModel.find({order_date:currentDate}).sort( { order_status: 1 });
          retreivOrderData.exec(function(err,Data){
            console.log(Data); 
            Data[0]?Data[0]['orderStatus']=orderStatus:Data=0;
          orderData=Data
           res.render('./admin/adminMain',{proData:'',singleData:'',userInfo,orderData,singleProData:''});
         });
        }else{
       var retreivOrderData=orderDataModel.find({$and:[{order_status:{$eq:orderStatus}},{order_date:{$eq:currentDate}}]}).sort( { order_status: 1 });
       retreivOrderData.exec(function(err,Data){ 
        Data[0]?Data[0]['orderStatus']=orderStatus:Data=0;
       orderData=Data
        res.render('./admin/adminMain',{proData:'',singleData:'',userInfo,orderData,singleProData:''});
      });
    }
     
      });


      router.get('/fetchproduct/:orderID', function(req, res, next) {
        var orderID=req.params.orderID;
       var retreiveProductData=orderdProductModel.find({order_id:parseInt( orderID)});
       retreiveProductData.exec(function(err,singleProData){
         console.log(singleProData);
        res.render('./admin/adminMain',{proData:'',singleData:'',userInfo,orderData,singleProData});
       })
        });

        router.get('/changeStatus/:actionBtn/:orderID', function(req, res, next) {
          var orderID=req.params.orderID;
          var actionBtn=req.params.actionBtn;
          if(actionBtn=='placed'){
            console.log("ORDER ID IS "+parseInt(orderID));

            orderDataModel.findOneAndUpdate({order_id:parseInt(orderID)},{
              order_status:'Order placed',
            }).exec(function(err,data){
              console.log(data);
              if(err) throw err;
              res.redirect('/admin') 
        
          });
        
          }else{

            orderDataModel.findOneAndUpdate({order_id:parseInt(orderID)},{
              order_status:'Order Cancelled'
            }).exec(function(err){
              if(err) throw err;
              res.redirect('/admin') 
        
          });
          }
        
          });  

      router.get('/adminSignOut', function(req, res, next) {
        req.session.destroy(function(err) {})
        res.redirect('/')
        });


module.exports = router;
