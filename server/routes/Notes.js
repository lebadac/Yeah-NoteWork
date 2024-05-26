const express = require("express");
const router = express.Router();
const { Notes } = require("../models");

// Request to get all notes
router.get("/", async (req, res) => {
  try {
    const listOfNotes = await Notes.findAll({
      order: [["ID", "DESC"]], // Sort by Num column in descending order
    });
    res.json(listOfNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// Request to create a new student
router.post("/", async (req, res) => {
  const note = req.body;
  await Notes.create(note);
  res.json(note);
});

module.exports = router;
