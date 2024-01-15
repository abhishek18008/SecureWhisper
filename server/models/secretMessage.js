import mongoose from 'mongoose'

const messageSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const message=mongoose.model('secretMessage',messageSchema);
export default message;