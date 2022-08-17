const express = require("express")
const router = express.Router()
const Task = require("../model/task")



router.post("/Task",async(req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)

    }
})

router.get("/Tasks",async(req,res)=>{
    try {
      const task =  await Task.find({})
      res.status(200).send(task)
    } catch (error) {
        res.status(200).send(error)
    }
    

})

router.get("/Tasks/:id",async(req,res)=>{
    const _id = req.params.id
    try {
      TaskFindById =  await Task.findById(_id)
        res.status(200).send(TaskFindById)

    } catch (error) {
        res.status(400).send(error)

    }
   
})

router.patch("/updateTask/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const  user = await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if(!user){
          res.status(404).send()
        }
        res.send(user)
      } catch (error) {
          res.status(400).send(error)
      }

})

module.exports = router