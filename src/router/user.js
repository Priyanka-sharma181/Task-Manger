const express = require("express")
const router =  express.Router()
const User = require("../model/user")


router.post("/user",async (req,res)=>{
    const user = new User(req.body)
 try {
     await user.save()
     res.status(200).send(user)
 } catch (error) {
     res.status(400).send(error)
 }
})
router.get("/users",async(req,res)=>{
 try {
   users =  await User.find({})
  res.status(200).send(users)
 } catch (e) {
     res.status(400).send(e)
 }

})
router.get("/users/:id",async(req,res)=>{
 const _id = req.params.id
 try {
    const id = await User.findById(_id)
    res.status(200).send(id)
 } catch (error) {
     res.status(400).send(error)
 }

})
router.patch("/userUpdate/:id",async(req,res)=>{

 const id = req.params.id
 const updates = Object.keys(req.body)
 const allowedUpdates = ['name', 'email', 'password', 'age']
 const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

 if (!isValidOperation) {
     return res.status(400).send({ error: 'Invalid updates!' })
 }
 try {
   const  user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
   if(!user){
     res.status(404).send()
   }
   res.send(user)
 } catch (error) {
     res.status(400).send(error)
 }
})

module.exports = router