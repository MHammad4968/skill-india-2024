const fs = require("fs");
const aws = require("./aws");
const serverless = require("serverless-http");
require("dotenv").config()

async function getStocks() {
  let stock = {};
  try {
    await aws.getFromS3("db/stocks.json", "tmp");
    const data = fs.readFileSync("tmp/stocks.json", "utf-8");
    const obj = JSON.parse(data);
    for (let key in obj) {
      stock[key] = obj[key];
    }
    console.log("getStocks called.", stock);
    return stock;
  } catch (err) {
    console.error("Error reading file or parsing JSON:", err);
  }
}


function generate(num) {
  const genset = "abcdefghijklmnopqrstuvwxyz!@#$%&";
  let result = "";
  for (let x = 0; x < num; x++) {
    result = result.concat(
      genset[Math.floor(Math.random() * (genset.length - 1))]
    );
  }
  result = result.concat("---");
  result = result.concat(Math.floor(+new Date() / 1000));
  return result;
}
function prettyTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
}

async function isValidOrder(itemsList) {
  console.log(`called isValidOrder`);
  stocks = await getStocks();
  sumItems = 0;
  for (let key in itemsList) {
    console.log(`Key: ${key}, Stock: ${stocks[key]}, Order: ${itemsList[key]}`);
    if (!Number.isInteger(itemsList[key])) {
      console.log("not integer");
      return false;
    } else if (itemsList[key] < 0) {
      console.log("negative number");
      return false;
    } else if (itemsList[key] > stocks[key]) {
      console.log("val too high");
      return false;
    }
    sumItems+=itemsList[key];
  }
  if(sumItems==0){
    return false;
  }
  return true;
}

async function updateStocks(og, order) {
  modified = {};
  for (let key in og) {
    modified[key] = og[key] - order[key];
  }
  try {
    await fs.promises.writeFile("tmp/stocks.json", JSON.stringify(modified));
    console.log("Stocks updated successfully");
    aws.uploadToS3("tmp/stocks.json", "db");
  } catch (err) {
    console.log("Error stockUpdate:", err);
  }
}

function addOrder(order, signature) {
  const data = fs.readFileSync("tmp/orders.json", "utf-8");
  let existing = [];
  if (data.trim() !== "") {
    existing = JSON.parse(data);
    console.log(existing.length + " reeee");
  } else {
    console.log("File is empty");
  }
  const payload = {
    id: existing.length + 1,
    timestamp: prettyTime(),
    orderData: order,
    orderSignature: signature,
  };
  existing.push(payload);
  fs.writeFileSync("tmp/orders.json", JSON.stringify(existing), (err) => {
    console.log("Error updating orders file");
  });
}



module.exports = {
  generate,
  prettyTime,
  isValidOrder,
  getStocks,
  updateStocks,
  addOrder,
};

module.exports.handler = serverless(app);