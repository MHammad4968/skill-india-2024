const utils = require("./utils");
require("dotenv").config();
const aws = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
let stocks = {};

app.use(cors());
app.use(express.json());

app.post("/buy", (req, res) => {
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
      utils.updateStocks(utils.getStocks(), order);
      console.log(response);
      console.log(utils.prettyTime());
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end({ error: "invalid input data" });
    }
  } else {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "No Items specified, invalid request." }));
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
