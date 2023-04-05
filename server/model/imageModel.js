const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const surveySchema = new mongoose.Schema({
    label:{type:String,required:true},
    image:{type:String,required:true},
    user:Schema.Types.ObjectId
})
const survey = mongoose.model('survey',surveySchema)
module.exports = survey