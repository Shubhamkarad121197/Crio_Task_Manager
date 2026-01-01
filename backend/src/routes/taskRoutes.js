const express=require('express');
const routes=express.Router();
const taskSchma=require('../models/taskManagerModel');
const {addTask,getTask,updateTask,deleteTask}=require('../controller/taskManager')


routes.post('/tasks',addTask);
routes.get('/tasks',getTask)
routes.put("/:id", updateTask);
routes.delete("/:id", deleteTask);

module.exports=routes;


