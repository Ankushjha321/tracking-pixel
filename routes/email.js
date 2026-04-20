// routes/email.js
const express = require("express");
const router = express.Router();
const sendTrackedEmail = require("../service/sendEmail");

router.post("/send", async (req, res) => {
  const { email } = req.body;

  await sendTrackedEmail(email);

  res.json({ message: "Email sent" });
});

module.exports = router;