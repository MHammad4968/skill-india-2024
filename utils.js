const fs = require("fs");

function getStocks() {
  let stock = {};
  try {
    const data = fs.readFileSync("stocks.json", "utf-8");
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

function isValidOrder(itemsList) {
  console.log(`called isValidOrder`);
  stocks = getStocks();
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
  }
  return true;
}

function updateStocks(og, order) {
  modified = {};
  for (let key in og) {
    modified[key] = og[key] - order[key];
  }
  fs.writeFile("stocks.json", JSON.stringify(modified), (err) => {
    if (err) {
      console.log("Error updating stocks.json");
    }
  });
}

module.exports = {
  generate,
  prettyTime,
  isValidOrder,
  getStocks,
  updateStocks,
};
