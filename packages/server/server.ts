
const express = require('express');

const app = express();
const port = 3000; // You can use any port number here

// Define your Express routes here
app.get('/api/test', (req, res) => {
  res.json({ message: 'This is a test API endpoint' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
