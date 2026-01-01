const taskSchema=require('../models/taskManagerModel')


exports.addTask=async (req,res)=>{
    try{
        const addTask=await taskSchema.create(req.body);
        res.status(201).json({message:'Task Created Successfully',data:addTask})
    }
    catch(err){
         res.status(500).json({message:err})
    }
    

    
}

exports.getTask=async (req,res)=>{
    try{
        const getAllTask=await taskSchema.find().sort({createdOn:-1});
        res.status(200).json({data:getAllTask})
    }
    catch(err){
         res.status(501).json({message:err})
    }
}

/* UPDATE PRODUCT */
exports.updateTask = async (req, res, next) => {
  try {
    const Task = await taskSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!Task)
      return res.status(404).json({ message: "Tasks not found" });

    res.status(200).json({ success: true, data: Task });
  } catch (error) {
    next(error);
  }
};

/* DELETE PRODUCT */
exports.deleteTask = async (req, res, next) => {
  try {
    const Task = await Product.findByIdAndDelete(req.params.id);

    if (!Task)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
