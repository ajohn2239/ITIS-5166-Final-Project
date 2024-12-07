
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const secretKey = 'MySuperSecretKey';

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({
      message: 'Welcome to the API! Use /login to authenticate and access other endpoints.'
  });
});

// Hardcoded user credentials
const USERNAME = 'Aminah';
const PASSWORD = 'Aminah';

// Login route
app.get('/login', (req, res) => {
  res.json({
      message: 'This is the login.'
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.json({ success: true, token });
  } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/logout', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(400).json({ message: 'No token provided' });
  }
  // Optional: Add logic to handle token invalidation.
  res.json({ message: 'Logged out successfully' });
});


// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token is missing' });

  jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
  });
};

// Protected route example (e.g., Dashboard)
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.json({
      success: true,
      message: 'Welcome to the Dashboard!',
      user: req.user,
  });
});

// Serve the chart data as a JSON response
app.get('/api/chart1', (req, res) => {
  res.json({
    chart1: [
      //{label: "Sharing Identity", "Strongly Agree": 21.57, "Agree": 41.18 },
      {label: "Expressing Outwardly on Campus", "Strongly Agree": 15.69, "Agree": 43.14, "Neutral": 13.73, "Disagree": 27.45, "Strongly Disagree": 0},
      {label: "Expressing in Classroom", "Strongly Agree": 5.88, "Agree": 39.22, "Neutral": 41.18, "Disagree": 9.8, "Strongly Disagree": 3.92}
    ]
  });
});

app.get('/api/chart2', (req, res) => {
  res.json({
    chart2: [
      { label: "Used All Gender Bathrooms", "Yes": 56.86, "Neutral": 33.33 },
      {label: "Visited Lavender Lounge", "Yes": 39.22, "No": 35.29, "Unsure": 25.49},
      {label: "Participated in LGBTQ+ Orgs", "Yes": 31.37, "No": 66.67, "Unsure": 1.96}
    ]
  });
});

app.listen(port, () => {
  console.log(`API Served at http://localhost:${port}`);
});
