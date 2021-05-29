const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{type:String, required:true},
    company:{type:String, required:true},
    link:{type:String, required:true},
    portal:{type:String, required:true},
    category:{type:String, required:true},
    location:{type:String, required:false},
    deadline:{type:String, required:false},
    scrapedOn:{type:String,required:true,default:new Date().toLocaleString()}
});

module.exports=mongoose.model('Job',jobSchema);