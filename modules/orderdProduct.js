var mongoose=require("mongoose");
mongoose.connect(process.env.DB,{useNewUrlParser:true});
var conn=mongoose.Collection;
var orderdProductSchema=new mongoose.Schema({
            order_id:{
                type:Number
            },
            product_name:{
                type:String
            },
            product_total:{
                type:String
            },

});
var orderdProductModel=mongoose.model('order_product',orderdProductSchema);
module.exports=orderdProductModel;