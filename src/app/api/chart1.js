const express = require('express');
const app = express();

app.get('/api/chart1', (req, res) => {
  res.json({
    "chart1": [
      {"label": "Sharing Identity", "Strongly Agree": 21.57, "Agree": 41.18, "Neutral": 25.49, "Disagree": 11.76, "Strongly Disagree": 0},
      {"label": "Expressing Outwardly on Campus", "Strongly Agree": 15.69, "Agree": 43.14, "Neutral": 13.73, "Disagree": 27.45, "Strongly Disagree": 0},
      {"label": "Expressing in Classroom", "Strongly Agree": 5.88, "Agree": 39.22, "Neutral": 41.18, "Disagree": 9.8, "Strongly Disagree": 3.92}
    ]
  });
});

app.listen(4200, () => console.log('Server running on port 4200'));
