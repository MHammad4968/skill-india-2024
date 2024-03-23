const apiUrl = 'http://localhost:3000/'
const stockUrl = apiUrl+"stocks"
const orderUrl = apiUrl+"orders"
let stockData;
let orderArray;
const stock = document.getElementById("stocks");
fetch(stockUrl,
    {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}).then(response => response.json())
  .then(data => {
    stockData = data;
    Object.entries(stockData).forEach(([itemName, quantity]) => {
        const stockDiv = document.createElement('div');
        stockDiv.textContent = `${itemName}: ${quantity}`;
        stock.appendChild(stockDiv);
      });
  });


fetch(orderUrl,{
    method:"GET",
    headers: {
        "Content-Type":"application/json"
    }
}).then(response => response.json()).then(data =>{
    orderArray = JSON.parse(data);
    const orders = document.getElementById("orders");
    orderArray.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        orderDiv.textContent = `Order: ${order.id}`;
        orders.appendChild(orderDiv);
    });
});
