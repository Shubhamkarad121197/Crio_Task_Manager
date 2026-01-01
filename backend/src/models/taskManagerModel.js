const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    Title:{
        type:String,
        trim:true,
        required:true
    },
    Description:{
        type:String,
        trim:true,
        required:true
    },
    Status:{
        type:String,
        enum:['TODO','DONE'],
        default:'TODO'
    },
    linkedFile:{
        type:Buffer,
        required:false
    },
    createdOn:{
        type:Date,
        default:Date.now,
        required:true
    },
     deadline: {
      type: Date,
      required: true
    }
}, {
    timestamps: false 
  })

  module.exports=mongoose.model('crio-Task',taskSchema);