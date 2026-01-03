const express = require('express');
const router = express.Router();
const upload = require('../middleWare/upload');
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controller/taskManager');

// ⛔ THIS LINE WAS MISSING EARLIER
router.post('/tasks', upload.single('file'), addTask);

router.get('/tasks', getTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
