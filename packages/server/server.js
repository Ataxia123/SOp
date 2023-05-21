var express = require('express');
var app = express();
var port = 3000; // You can use any port number here
// Define your Express routes here
app.get('/api/test', function (req, res) {
    res.json({ message: 'This is a test API endpoint' });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
