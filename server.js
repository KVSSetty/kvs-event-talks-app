const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get talk data
app.get('/api/talks', (req, res) => {
  fs.readFile(path.join(__dirname, 'talks.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading talks data');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/talks/speaker/:speaker', (req, res) => {
  const speaker = req.params.speaker.toLowerCase();
  fs.readFile(path.join(__dirname, 'talks.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading talks data');
      return;
    }
    const talks = JSON.parse(data);
    const filteredTalks = talks.filter(talk =>
      talk.speakers.some(s => s.toLowerCase().includes(speaker))
    );
    res.json(filteredTalks);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
