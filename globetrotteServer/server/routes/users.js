const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const Destination = require("../models/Destination");

// Create new user
router.post("/register", async (req, res) => {
  try {
    const inviteCode = crypto.randomBytes(6).toString("hex");
    const user = new User({
      username: req.body.username,
      inviteCode,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user score
router.put("/score/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.body.isCorrect) {
      user.score.correct += 1;
    } else {
      user.score.incorrect += 1;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/unique", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const inviteCode = crypto.randomBytes(6).toString("hex");
      const user = new User({
        username: req.body.username,
        inviteCode,
      });
      const newUser = await user.save();
      return res.json({ isUniqueUser: true, inviteCode });
    } else {
      return res.json({ isUniqueUser: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user by invite code
router.get("/invite/:code", async (req, res) => {
  try {
    const user = await User.findOne({ inviteCode: req.params.code });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user scores based on answer verification
router.post('/verify/:id', async (req, res) => {
  const { answer, username, userId } = req.body;

  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const correctAnswer = destination.destination.toLowerCase().trim();
    const isCorrect = answer.toLowerCase().trim() === correctAnswer;

    // Update user scores
    const user = await User.findById(userId);
    if (user) {
      if (isCorrect) {
        user.correctAnswers += 1;
      } else {
        user.incorrectAnswers += 1;
      }
      await user.save();
    }

    res.status(200).json({
      isCorrect,
      destination: destination.destination,
      funFacts: destination.funFacts || [],
      trivia: destination.trivia || ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
