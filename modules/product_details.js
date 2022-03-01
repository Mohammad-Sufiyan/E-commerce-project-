var mongoosePaginate = require('mongoose-paginate');
const mongoose=require('mongoose');
mongoose.connect(process.env.DB,{useNewUrlParser:true});
var conn=mongoose.Collection;
if(conn){
    console.log('connected');

}else{
    console.log('disconnected');
}
var productSchema=new mongoose.Schema({
    product_name:{type:String
       
    },
    product_description:{type:String
       
    },
        product_category:{type:String
           
            },
        product_brand:{type:String
           
            
             },
             product_price:{type:Number
                
                
                
                 },
                 product_color:{type:String
                  
                    
                     },
                     product_size:{type:String
                      
                        
                         },
                         product_tags:{type:String
                           
                            
                             },
                             product_stock:{
                                 type:String
                             },
                             product_type:{
                                type:String
                             },
                             product_image:{type:String
                              
                                
                                 }
       
});
productSchema.plugin(mongoosePaginate);
var productModel=mongoose.model('product_details',productSchema);
module.exports=productModel;