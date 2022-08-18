const express = require("express")
const router =  express.Router()
const User = require("../model/user")
const auth  = require("../middle/auth")


router.post("/user",async (req,res)=>{
    const user = new User(req.body)
 try {
     await user.save()
     const token = await user.generateAuthToken()
     res.status(201).send({ user, token })

 } catch (error) {
     res.status(400).send(error)
 }
})

router.post("/user/login", async(req,res)=>{
    try {
    const user = await  User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })

    } catch (e) {
        res.send(e)
    }
})

router.post("/user/logout",auth,async(req,res)=>{
try {
    // console.log(req.user.tokens)
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
} catch (error) {
    
}
})
router.get("/users/me",auth,async(req,res)=>{
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
 } catch (e) {
    console.log(e);
     res.status(400).send(e)
 }
})

router.delete("/deleteUSer/:id",async (req,res)=>{
   try {
    console.log(req.params.id);
     const user =await  User.findByIdAndDelete(req.params.id)
     if(!user){
        res.send(400).send()
     }
     res.send(user)
   } catch (error) {
    res.status(500).send(error)
   }
})

module.exports = router