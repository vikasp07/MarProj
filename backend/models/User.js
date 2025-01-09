const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String,
  community: String,
  religion: String,
  caste: String,
  preferences: {
    personality: { type: String },
    lifestyle: { type: String },
  },
  familyBackground: {
    familyValues: { type: String },
    preferredMatchFamily: { type: String },
  },
  horoscope: String,
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
