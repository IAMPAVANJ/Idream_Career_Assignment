const express = require("express");
const router = express.Router();
const ImageModel = require("../model/imageModel")
const userMiddleware = require("../auth/auth");
const {PostImage,deleteImage,getAllImages} = require("../controller/imageController")
router.use("/uploadImage",userMiddleware,PostImage)
router.use("/deleteImage/:id",deleteImage)
router.use("/",userMiddleware,getAllImages)

module.exports = router