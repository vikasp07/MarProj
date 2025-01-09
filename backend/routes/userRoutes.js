const express = require('express');
const User = require('../models/User');
const aiUtils = require('../utils/aiUtils');

const router = express.Router();

// Get User Profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update User Profile
router.put('/profile/:id', async (req, res) => {
  try {
    const { preferences, familyBackground } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { preferences, familyBackground },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// AI Matchmaking
router.get('/match/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const potentialMatches = await User.find({
      community: user.community,
      _id: { $ne: user._id },
    });

    // Run AI matchmaking (AI logic in aiUtils)
    const matches = aiUtils.matchUsers(user, potentialMatches);
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
