const mongoose = require("mongoose")
require("dotenv").config
mongoose.connect('mongodb://127.0.0.1:27017/task-manger',(error,result)=>{
    if(error){
        console.log("unable to connect");
    }else{
        console.log("connected");
    }
})
 

// const me = new User({
//     name:'Priyanka',
//     age:22
// })
// me.save().then(()=>{
//     console.log(me);
// })
// .catch((error)=>{
//     console.log(error);
// })
