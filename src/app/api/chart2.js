const express = require('express');
const app = express();

app.get('/api/chart2', (req, res) => {
  res.json({
    "chart2": [
        {"label": "Used All Gender Bathrooms", "Yes": 56.86, "Neutral": 33.33, "No": 9.8},
        {"label": "Visited Lavender Lounge", "Yes": 39.22, "Aware But Didn't Visit": 35.29, "Didn't Know Exists": 25.49},
        {"label": "Participated in LGBTQ+ Organizations", "Yes": 31.37, "No": 66.67, "Unsure": 1.96}
    ]
  });
});

app.listen(4200, () => console.log('Server running on port 4200'));
