const express=require('express');
const router=express.Router();
const {signin,signup,deleteAcc}=require('../Controllers/auth.controller');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../Models/user.model');


router.post('/signin',signin);
router.post('/signup',signup);
router.post('/deleteAcc',deleteAcc);



module.exports=router;
