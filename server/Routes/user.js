const express = require("express");
const router = express.Router();
const {register,login} = require("../controller/userController")

router.use("/register",register)
router.use("/login",login)

module.exports = router;