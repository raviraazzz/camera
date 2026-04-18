const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json({ limit: "10mb" }));

let images = [];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

app.post("/upload", (req, res) => {
  images.push(req.body.image);
  res.send("ok");
});

setInterval(async () => {
  if (images.length === 0) return;

  const html = images.map(img => `<img src="${img}" width="200"/>`).join("");

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Photos",
    html
  });

  images = [];
}, 30000);

app.listen(3000);
