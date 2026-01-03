const Task = require('../models/taskManagerModel');

/* ================= CREATE TASK ================= */
exports.addTask = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      linkedFile: req.file ? req.file.buffer : null,
    });

    res.status(201).json({
      message: 'Task Created Successfully',
      data: task,
    });
  } catch (error) {
    console.error('ADD TASK ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL TASKS ================= */
exports.getTask = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error('GET TASK ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* ================= UPDATE TASK ================= */
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task Updated Successfully',
      data: updatedTask,
    });
  } catch (error) {
    console.error('UPDATE TASK ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* ================= DELETE TASK ================= */
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task Deleted Successfully',
    });
  } catch (error) {
    console.error('DELETE TASK ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
