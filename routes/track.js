const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// 1x1 transparent GIF
const pixel = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  "base64"
);

// 🔥 helper to extract real IP
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim(); // first IP = real client
  }
  return req.socket.remoteAddress;
};

// OPEN tracking pixel
router.get("/open", async (req, res) => {
  const { emailId } = req.query;

  const ip = getClientIp(req);

  try {
    await Event.create({
      emailId,
      type: "OPEN",
      userAgent: req.get("User-Agent"),
      ip: ip,
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

  const ip = getClientIp(req);

  try {
    await Event.create({
      emailId,
      type: "CLICK",
      userAgent: req.get("User-Agent"),
      ip: ip,
    });
  } catch (e) {
    console.error(e);
  }

  return res.redirect(redirect);
});

module.exports = router;