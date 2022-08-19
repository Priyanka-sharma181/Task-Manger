const express = require("express")
const router =  express.Router()
const User = require("../model/user")
const auth  = require("../middle/auth")
const multer = require("multer")
const sharp = require("sharp")


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
    res.send({ user , token })

    } catch (e) {   
        res.send(e)
    }
})

router.post("/user/logout",auth,async (req,res)=>{
try {
    // console.log(req.user.tokens)
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
} catch (error) {
    res.send(error)
}
})


router.get("/users/me",auth,async(req,res)=>{
 try {
//    users =  await User.find({})
       res.send(req.user)   
   } catch (e) {
     res.status(400).send(e)
 }
})


router.patch("/user/me/:id",auth,async(req,res)=>{

 const id = req.user._id
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

router.delete("/users/me/:id",auth,async (req,res)=>{
   try {
     await req.user.remove()
     res.send(req.user)
   } catch (error) {
    res.status(500).send(error)
   }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
module.exports = router