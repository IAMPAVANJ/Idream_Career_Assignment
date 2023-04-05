const  ImageModel = require("../model/imageModel");

const PostImage = async(req,res)=>{
    
    const {label,image} = req.body
    try{
        const user = req.user
        
        const newData = await new ImageModel({
            ...req.body,user
        })
        await newData.save();
        res.status(201).json({
            message:"image Created SuccessFully",
            newData
        })

    }catch(err){
        
        res.status(400).json({
            "status":"failed here",
            message:err.message
        })
    }
}

const getAllImages = async(req,res)=>{
    
    try{
        const user = req.user
        const data = await ImageModel.find({user:req.user})
        return res.status(200).json({
            "Status":"Success",
            data
        })
    }catch(err){
        return res.status(400).json({
            "Status":"failed in getting images",
            message:err.message
        })
    }
    
}
const deleteImage = async(req,res)=>{
    
    try{
        
        const image = await ImageModel.findByIdAndDelete(req.params.id)
        if(image){
            return res.status(200).json({
                "Status":"success",
                message:"Successfully deleted",
                image
            })
        }

    }catch(err){
        res.status(400).json({
            message:"error caught"
        })
    }
    
}

module.exports = {PostImage,deleteImage,getAllImages}