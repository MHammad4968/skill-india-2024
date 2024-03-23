const utils = require("./utils");
require("dotenv").config();
const aws = require("./aws");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const serverless = require('serverless-http');
let stocks = {};

app.use(cors());
app.use(express.json());

app.post("/buy", async (req, res) => {
  let order = {};
  let items = req.body.items || false;
  console.log(items);
  if (items) {
    if (utils.isValidOrder(items)) {
      response = {
        result: utils.generate(10),
      };
      for (let key in items) {
        order[key] = items[key];
      }
      og = await utils.getStocks();
      utils.updateStocks(og, order);
      utils.addOrder(req.body, response.result);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } 
    else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "invalid input data" }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end({ "error": "No Items specified, invalid request." });
  }
});

app.get("/stocks", async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(await utils.getStocks()));
});

app.get("/orders", async (req, res) => {
  const data = fs.readFileSync("/tmp/orders.json", "utf-8");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
})
app.post("/reset", async (req, res) => {
  auth = req.body.auth || false;
  if (auth == process.env.AUTH) {
    utils.resetStocks();
    fs.writeFileSync("/tmp/orders.json", "");
    aws.uploadToS3("/tmp/orders.json", "db");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Stocks reset successfully" }));
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized" }));
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports.handler = serverless(app);