const utils = require("./utils");
require("dotenv").config();
const aws = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 

app.post("/buy", (req, res) => {
    console.log(req.body);
    response = {
        result: utils.generate(10)
    }
    console.log(response);
    console.log(utils.prettyTime());
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(response));
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
console.log(process.env.KEY);