require("dotenv").config();
const aws = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 

app.post("/buy", (req, res) => {
    console.log(req.body);
    console.log(Math.floor(+new Date() / 1000));
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(req.body));
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
console.log(process.env.KEY);