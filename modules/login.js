var mongoose=require('mongoose');
mongoose.connect(process.env.DB,{useNewUrlParser:true});
var conn=mongoose.Collection;
var loginSchema=new mongoose.Schema({
    name:{
        type:String
    },
    contact:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    

});

var loginModel=mongoose.model('login',loginSchema);
module.exports=loginModel;