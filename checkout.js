const cart = JSON.parse(localStorage.getItem("cart")) || [];
const itemsContainer = document.getElementById("checkout-items");
const totalContainer = document.getElementById("checkout-total");

let totalPrice = 0;


if (cart.length === 0) {
  itemsContainer.innerHTML = `
    <p class="empty">Your cart is empty.</p>
  `;
} else {
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <h4>$${itemTotal.toFixed(2)}</h4>
    `;

    itemsContainer.appendChild(div);
  });
}



totalContainer.textContent = `$${totalPrice.toFixed(2)}`;


function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Order placed successfully!\nThank you for ordering with Foodie.");

  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
