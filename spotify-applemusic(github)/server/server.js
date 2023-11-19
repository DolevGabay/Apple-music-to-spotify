require('./loadEnvironment');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const conn = require('./db/conn');
const apple = require('./routes/apple');
const spotify = require('./routes/spotify');
const auth = require('./routes/auth');
const transfers = require('./routes/transfers');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 8888;
const app = express();

app.use(session({
    secret: 'matandolev', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dolevjunk1903@gmail.com',
      pass: 'nkyp kdtj utay voen',
    },
  });

  const mailOptions = {
    from: 'dolevjunk1903@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).send('Error sending email');
  }
});

app.use('/Apple', apple);
app.use('/Spotify', spotify);
app.use('/auth', auth);
app.use('/transfers', transfers);

conn.getDb();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
