const express = require('express');
const router = express.Router();
const { Notes } = require('../models');

// Route to get all notes
router.get('/', async (req, res) => {
  try {
    const listOfNotes = await Notes.findAll({
      order: [['ID', 'DESC']], // Sort by ID column in descending order
    });
    res.json(listOfNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new note
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const { TaskName, Type, Status } = req.body;
    const newNote = await Notes.create({ TaskName, Type, Status });
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
});
// Route to update the status of a task
// Khai báo biến đếm số lần nhấn


router.put('/status/:taskId', async (req, res) => {
  try {
    // Lấy id của nhiệm vụ từ yêu cầu
    const taskId = req.params.taskId;

    // Tìm nhiệm vụ theo ID
    const notes = await Notes.findOne({ where: { id: taskId } });

    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Kiểm tra trạng thái hiện tại của nhiệm vụ và chuyển đổi
    if (notes.Status === "done") {
      notes.Status = "pending";
    } else if (notes.Status === "pending") {
      notes.Status = "done";
    }

    // Lưu thay đổi
    await notes.save();

    // Trả về thông tin nhiệm vụ đã cập nhật
    res.json(notes);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

router.put('/edit/:taskId', async (req, res) => {
  try {
    // Lấy id của nhiệm vụ từ yêu cầu
    const taskId = req.params.taskId;
    const { TaskName, Type } = req.body;
    // Tìm nhiệm vụ theo ID
    const notes = await Notes.findOne({ where: { id: taskId } });
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    // Kiểm tra trạng thái hiện tại của nhiệm vụ và chuyển đổi
    notes.TaskName = TaskName;
    notes.Type = Type;

    // Lưu thay đổi
    await notes.save();

    // Trả về thông tin nhiệm vụ đã cập nhật
    res.json(notes);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status" });
  }
});


// Route to delete a task by ID
router.delete('/:taskId', async (req, res) => {
  try {
    const deletedCount = await Notes.destroy({
      where: { id: req.params.taskId },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
