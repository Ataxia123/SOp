"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var port = 3000; // You can use any port number here
// Define your Express routes here
app.get('/api/test', function (req, res) {
    res.json({ message: 'This is a test API endpoint' });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
