const orders = JSON.parse(localStorage.getItem("orders")) || [];
const container = document.getElementById("orders-container");

if (orders.length === 0) {
  container.innerHTML = "<p>No orders found.</p>";
} else {
  orders.reverse().forEach(order => {
    const div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <h4>Order ID: ${order.id}</h4>
      <p>Date: ${order.date}</p>
      <p><strong>Total: $${order.total}</strong></p>
      <div>
        ${order.items.map(
          item => `<div class="item">• ${item.name} × ${item.quantity}</div>`
        ).join("")}
      </div>
    `;

    container.appendChild(div);
  });
}
