const MongoClient = require("mongodb").MongoClient
const conectionUrl = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"
const databaseName  = "task-manger"
MongoClient.connect(conectionUrl,(error,client)=>{
    if(error){
        console.log(error);
    }
    else{
        db = client.db(databaseName)
        // db.collection('user').insertOne({name:"pinku",age:22},(error,result)=>{
        //     if(error){
        //         console.log("unable to insert");
        //     }
        //     console.log(result);
        // })
        // db.collection('user').insertMany([{name:"shuh",age:24},{name:"riya",age:84},{name:"uma",age:24}],(error,res)=>{
        //     if(error){
        //         console.log("unable to fine");
        //     }
        //     else{
        //         console.log(res);
        //     }
        // })
        // added task 
        db.collection('task').insertMany([{description:true,completed:"clean the house"},{description:false,completed:"pot plants"}],(error,res)=>{
            if(error){
                console.log("unable to insert");
            }
            console.log(res);
        })
    }
    
})