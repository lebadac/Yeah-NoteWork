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
router.post('/', async (req, res) => {  // Correct path: '/notes' is redundant because this file is mounted at '/notes'
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

module.exports = router;
