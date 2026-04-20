require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.set("trust proxy", true);

app.use("/track", require("./routes/track"));
app.use("/email", require("./routes/email"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});