// const express = require('express');
// import { OpenAI } from "langchain/llms/openai";

// const app = express();
// const port = 3000; // You can use any port number here
// const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
// const res = await model.call(
//   "What would be a good company name a company that makes colorful socks?"
// );
// console.log(res);
// // Define your Express routes here
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'This is a test API endpoint' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('This is a test web page!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
    