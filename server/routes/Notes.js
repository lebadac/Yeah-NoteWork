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


router.put('/:taskId', async (req, res) => {
  try {
    // Get ID from task
    const taskId = req.params.taskId;
    // Find by ID
    const notes = await Notes.findOne({ where: { id: taskId } });
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check status and change
    if (notes.Status === "done") {
      notes.Status = "pending";
    } else if (notes.Status === "pending") {
      notes.Status = "done";
    }

    // Save 
    await notes.save();

    // Return
    res.json(notes);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

router.put('/edit/:taskId', async (req, res) => {
  try {
    // Get ID
    const taskId = req.params.taskId;
    const { TaskName, Type } = req.body;
    // Find by ID
    const notes = await Notes.findOne({ where: { id: taskId } });
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    // Edit attributes
    notes.TaskName = TaskName;
    notes.Type = Type;

    // Save
    await notes.save();

    // Return
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

router.delete('/all', async (req, res) => {
  try {
    await Notes.destroy({ where: {}, truncate: true });
    res.json({ message: 'All notes have been deleted' });
  } catch (error) {
    console.error('Error deleting all notes:', error);
    res.status(500).json({ message: 'Error deleting all notes' });
  }
});


module.exports = router;
