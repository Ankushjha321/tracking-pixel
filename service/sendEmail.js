// service/sendEmail.js
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Email = require("../models/Email");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // app password
  }
});

const sendTrackedEmail = async (to) => {
  // 1. Generate unique emailId
  const emailId = crypto.randomUUID();

  // 2. Store mapping
  await Email.create({
    emailId,
    userEmail: to,
    type: "COMPLAINT_FOLLOWUP"
  });

  // 3. Build tracked links
  const openPixel = `https://tracking-pixel-g1wd.onrender.com/track/open?emailId=${emailId}`;

  // 4. Email HTML
  const html = `
    <p>Hello,</p>
    <p>Please complete your complaint details.</p>

    <img src="${openPixel}" width="1" height="1" style="opacity:0;" />
  `;

  // 5. Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Complete your complaint details",
    html
  });

  console.log("Email sent with ID:", emailId);
};

module.exports = sendTrackedEmail;