// models/Email.js
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  emailId: String,
  userEmail: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Email", emailSchema);