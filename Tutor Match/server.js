const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route to get all tutors
app.get('/api/tutors', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  res.json(data.tutors);
});

// Route to add a new tutor
app.post('/api/tutors', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  const newTutor = req.body;

  data.tutors.push(newTutor);
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Tutor added successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
