const express = require("express");
const connect = require("./database/db")
const user = require("./Routes/user")
const Image = require("./Routes/image")
const cors = require("cors")
const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
connect();

//middleware
app.use("/",user)
app.use("/",Image)


app.listen(port,()=>{
    console.log(`server is up at ${port}`)
})