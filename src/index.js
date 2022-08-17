const express = require("express")
const app = express()
require("./db/mongoose")
const User = require("./model/user")
const Task = require("./model/task")
port = process.env.PORT || 3000
 

app.listen(port,()=>{
    console.log(`server is on ${port} `);
})