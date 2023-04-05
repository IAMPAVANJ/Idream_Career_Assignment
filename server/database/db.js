const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
async function getConnection(){
    const url = "mongodb+srv://pavan1010:pavan1010@surveyform2.cpahjme.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(url)
    .then(()=>{
        console.log("connected to mongoDb")
    })
    .catch((err=>{
        console.log("Disconnected to mongodb")
    }))
}
module.exports = getConnection;