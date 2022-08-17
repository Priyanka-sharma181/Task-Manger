const mongoose = require("mongoose")
require("dotenv").config
mongoose.connect('mongodb://127.0.0.1:27017/task-manger',(error,result)=>{
    if(error){
        console.log("unable to connect");
    }else{
        console.log("connected");
    }
})
