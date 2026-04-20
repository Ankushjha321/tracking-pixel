const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// 1x1 transparent GIF
const pixel = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  "base64"
);

// OPEN tracking pixel
router.get("/open", async (req, res) => {
  const { emailId } = req.query;

  try {
    await Event.create({
      emailId,
      type: "OPEN",
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    });
  } catch (e) {
    console.error(e);
  }

  res.set("Content-Type", "image/gif");
  res.send(pixel);
});

// CLICK tracking
router.get("/click", async (req, res) => {
  const { emailId, redirect } = req.query;

  try {
    await Event.create({
      emailId,
      type: "CLICK",
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    });
  } catch (e) {
    console.error(e);
  }

  return res.redirect(redirect);
});

module.exports = router;