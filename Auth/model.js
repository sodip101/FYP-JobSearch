const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    token: { type: String, required: true },
    savedJobs: { type: Array, required: false },
    appliedJobs: { type: Array, required: false },
});

module.exports=new mongoose.model('User',userSchema);