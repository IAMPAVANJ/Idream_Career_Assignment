const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try{    
        const user = await UserModel.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({
                msg:"User already exist"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)
    const newUser = await new UserModel({
        ...req.body,
        password:hash
    })
    await newUser.save()
    res.status(201).json({
        msg:"user Created",
        newUser
    })
    }catch(err){
        res.status(400).json({
            "status":"failed",
            msg:err.message
        })
    }
   
}

const login = async(req,res)=>{

    try{
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({
                success:false,
                message:"Email Not registered"
            })
        }
        const isPassword = bcrypt.compare(req.body.password,user.password)
        if(!isPassword){
            res.status(400).json({
                message:"Invalid Password"
            })
        }
        const token = jwt.sign({id:user._id,email:user.email},"secretKey",{expiresIn:60*60*1000})
        res.status(200).json({
            success:true,
            message:"logged In SuccessFully",
            token:token,
            user
        })
    }catch(err){
        res.status(400).json({
            "Status":"failed",
            msg:err.msg
        })
    }
}

module.exports = {register,login}
