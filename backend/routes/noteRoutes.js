const express = require("express");

const mongoose = require("mongoose");

const Note = require("../models/Note");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================
// GET ALL NOTES
// ==========================
router.get("/", authMiddleware, async (req, res) => {

  try {

    const notes = await Note.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message
    });
  }
});


// ==========================
// CREATE NOTE
// ==========================
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({
        message: "Content is required"
      });
    }

    const note = new Note({
      title: title?.trim() || "Untitled Note",
      content: content.trim(),
      userId: req.user.id
    });

    const savedNote = await note.save();

    res.status(201).json(savedNote);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create note",
      error: error.message
    });
  }
});


// ==========================
// UPDATE NOTE
// ==========================
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { id } = req.params;

    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note ID"
      });
    }

    const note = await Note.findOne({
      _id: id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.title = title?.trim() || note.title;

    note.content = content?.trim() || note.content;

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update note",
      error: error.message
    });
  }
});


// ==========================
// DELETE NOTE
// ==========================
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note ID"
      });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete note",
      error: error.message
    });
  }
});

module.exports = router;