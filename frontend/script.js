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
        stockDiv.innerHTML = `<b>${itemName}</b>: ${quantity}`;
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
        itemsList = order.items;

        orderDiv.classList.add('order');
        orderDiv.innerHTML = `<h3>Order ID: ${order.id}</h3>
        <p>Timestamp: ${order.timestamp}</p>
        <p>Agent: ${order.orderData.agent}</p>
        <p>Signature: ${order.orderSignature} </p>`;
        orders.appendChild(orderDiv);
    });
});
