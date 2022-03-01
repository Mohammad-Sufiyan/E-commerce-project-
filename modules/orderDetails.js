var mongoose=require("mongoose");
mongoose.connect(process.env.DB,{useNewUrlParser:true});
var conn=mongoose.Collection;
mongoose.set('useFindAndModify', false);
var orderDataSchema=new mongoose.Schema({
            order_date:{
                    type:String
                },
            order_id:{
                type:Number
            },
            user_name:{ 
                type:String
            },
            full_name:{
                type:String
            },
            country:{
                type:String
            },
            address:{
                type:String
            },
            pincode:{
                type:String
            },
            city:{
                type:String
            },
            email_id:{
                type:String
            },
            contact:{
                type:String
            },
            payment_method:{
                type:String
            },
            sub_total:{
                type:String
            },
            total:{
                type:String
            },
             order_status:{
                type:String
            }

});
var orderDataModel=mongoose.model('order_details',orderDataSchema);
module.exports=orderDataModel;