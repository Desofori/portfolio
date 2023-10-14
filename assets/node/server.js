const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const emailConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email (stored in .env)
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password (stored in .env)
  },
};

const transporter = nodemailer.createTransport(emailConfig);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Adjust the path to your HTML file
});

app.post('/submit-form', (req, res) => {
  const { fullname, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'desmondscutt84@gmail.com', // Recipient's email address
    subject: 'Contact Form Submission',
    text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
