const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET='nitishkumarghosh$itr'; 
router.post('/Createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 5 characters').isLength({min:5})
],async (req,res)=>{
     //if there are errors, return Bad request and the errors
     const result = validationResult(req);
     if (!result.isEmpty()) {
       return res.status(400).json({ errors: result.array() });
     }
     try {
        let user= await User.findOne({email:req.body.email});
        //check whether the email is already exist or not
        if(user){
            return res.status(400).json({error:"Email already exists"});
        }
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const secpass= await bcrypt.hash(req.body.password,salt);
        //create a new user
        user= await User.create({
            name: req.body.name,
            email:req.body.email,
            password:secpass
          })
          const data={
            user:{
                id:user.id
            }
          }
          // give the jwt token to the user
          const authToken=jwt.sign(data,JWT_SECRET);
          res.json({authToken});
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
     }
})
module.exports=router;