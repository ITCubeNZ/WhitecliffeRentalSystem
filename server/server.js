// server/index.js
const path = require('path');
const express = require('express');

const app = express()

const PORT = process.env.PORT || 3001;

// Handle GET requests to /api route
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});