require("dotenv").config();
// Import express and create an instance of it
const express = require("express");
const app = express();
// Set our port
// Start our server
app.listen(3000);
console.log(process.env.KEY);
