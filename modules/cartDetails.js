var mongoose=require("mongoose");
mongoose.connect(process.env.DB,{useNewUrlParser:true});
var conn=mongoose.Collection;
var cartDataSchema=new mongoose.Schema({
 
    user_name:{
        type:String
    },
    product_image:{type:String
       
    },
        product_name:{type:String
           
            },
     
             product_price:{type:Number
                
                
                
                 },
                 product_color:{type:String
                  
                    
                     },
                     product_size:{type:String
                      
                        
                         },
                         product_tags:{type:String
                           
                            
                             }

});
var cartDataModel=mongoose.model('cart_details',cartDataSchema);
module.exports=cartDataModel;