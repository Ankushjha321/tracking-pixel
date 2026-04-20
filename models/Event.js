const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  emailId: String,
  type: {
    type: String,
    enum: ["OPEN", "CLICK"],
  },
  userAgent: String,
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);