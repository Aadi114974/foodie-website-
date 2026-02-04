
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");

const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total"); 
const cartValue = document.querySelector(".cart-value");


cartIcon.onclick = () => cartTab.classList.add("cart-tab-active");
closeBtn.onclick = () => cartTab.classList.remove("cart-tab-active");


let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


fetch("product.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
    renderCart();
  });


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function renderProducts() {
  cardList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "Order-card";

    div.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">$${product.price}</h4>
      <a href="#" class="btn add-btn">Add to Cart</a>
    `;

    div.querySelector(".add-btn").onclick = e => {
      e.preventDefault();
      addToCart(product);
    };

    cardList.appendChild(div);
  });
}


function addToCart(product) {
  const item = cart.find(i => i.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
}


function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal; 
    totalItems += item.quantity;

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="item-image">
        <img src="${item.image}">
      </div>
      <div>
        <h4>${item.name}</h4>
        <h4 class="item-total">$${itemTotal.toFixed(2)}</h4>
      </div>
      <div class="flex">
        <a href="#" class="quantity-btn minus">-</a>
        <h4 class="quantity-value">${item.quantity}</h4>
        <a href="#" class="quantity-btn plus">+</a>
      </div>
      <a href="#" class="quantity-btn remove">x</a>
    `;

    div.querySelector(".plus").onclick = e => {
      e.preventDefault();
      item.quantity++;
      saveCart();
      renderCart();
    };

    div.querySelector(".minus").onclick = e => {
      e.preventDefault();
      item.quantity--;
      if (item.quantity === 0) removeItem(item.id);
      saveCart();
      renderCart();
    };

    div.querySelector(".remove").onclick = e => {
      e.preventDefault();
      removeItem(item.id);
    };

    cartList.appendChild(div);
  });

  
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalItems;
}
