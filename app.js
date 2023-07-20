// Rating stars function
function renderRating(props) {
  if (!props.value) {
    return "<div></div>";
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (props.value >= i + 1) {
      stars.push('<i class="fa fa-star" id="stars"></i>');
    } else if (props.value >= i + 0.5) {
      stars.push('<i class="fa fa-star-half-o" id="stars"></i>');
    } else {
      stars.push('<i class="fa fa-star-o" id="stars"></i>');
    }
  }

  const ratingText = props.text || "";

  return `
          <div class="rating">
            <span>${stars[0]}</span>
            <span>${stars[1]}</span>
            <span>${stars[2]}</span>
            <span>${stars[3]}</span>
            <span>${stars[4]}</span>
            <span>${ratingText}</span>
          </div>
        `;
}

const Rating = {
  render: renderRating,
};

// Render products
const productElement = document.querySelector(".product-list");
const cartItems = document.querySelector(".cart-items");
const subtotalElement = document.querySelector(".subtotal");
const emptyCart = document.getElementById("empty-cart");
const closeCart = document.getElementById("close-cart");
const openCart = document.getElementById("open-cart");
const cartBlock = document.querySelector(".cart");
const xIcon = document.querySelector(".x-icon");
const cartIcon = document.querySelector(".cart-icon");
const closePayment = document.querySelector(".fa-xmark");
const proceedCheckout = document.querySelector(".checkout");
const paymentWindow = document.querySelector(".payment");
const finalCheckout = document.querySelector(".final-checkout");
const payInput = document.querySelector(".payInput");

function finalPayment() {
  if (payInput.value === "") {
    alert("Please fill in all boxes!");
  } else {
    paymentWindow.classList.add("window");
    alert("Thank You! Your order will arrive soon!");
  }
}

proceedCheckout.addEventListener("click", function () {
  if (cart.length == 0) {
    alert("YOUR CART IS EMPTY!");
  } else {
    paymentWindow.classList.remove("window");
    cartBlock.classList.add("close");
    xIcon.classList.add("remove");
    cartIcon.classList.remove("remove");
  }
});

closePayment.addEventListener("click", function () {
  paymentWindow.classList.add("window");
});

openCart.addEventListener("click", function () {
  cartBlock.classList.remove("close");
  xIcon.classList.remove("remove");
  cartIcon.classList.add("remove");
});

closeCart.addEventListener("click", function () {
  cartBlock.classList.add("close");
  xIcon.classList.add("remove");
  cartIcon.classList.remove("remove");
});

function renderProduct() {
  products.forEach((product) => {
    const ratingHTML = Rating.render({ value: product.rating });
    productElement.innerHTML += `
        <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h3 class="p-name">${product.name}</h3>
          <p class="p-brand">${product.brand}</p>
          <p class="p-price">$${product.price}</p>
          <p class="p-rating">${ratingHTML}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
        `;
  });
}

renderProduct();

// Cart Array
const cartItemsDiv = document.querySelector(".cart-items");
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Add to cart
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// Update the cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // saving cart to localstorage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// Calculate subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subtotalElement.innerHTML = `Subtotal (${totalItems}): $${totalPrice}`;
}

function renderCartItems() {
  cartItemsDiv.innerHTML = "";
  cart.forEach((item) => {
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <div class="item-info">
          <img src="${item.image}" alt="${item.name}" class="cart-image" />
          <h4>${item.name}</h4>
        </div>
        <div class="unit-price"><small>$</small>${item.price}</div>
        <div class="units">
          <div class="btn minus" onclick="changeUnits('minus',${item.id})"><i class="fa-solid fa-minus"></i></div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" onclick="changeUnits('plus',${item.id})"><i class="fa-solid fa-plus"></i></div>
          <div onclick="removeItem(${item.id})"><i class="fa-solid fa-trash" ></i></div>
        </div>
      </div> 
    `;
  });
  if (cart.length == 0) {
    cartItemsDiv.innerHTML = `<div class="empty-cart">Cart is Empty</div>`;
  }
}

// remove items
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// Change the number of units function

function changeUnits(action, id) {
  cart = cart.map((item) => {
    let currentUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && currentUnits > 1) {
        currentUnits--;
      } else if (action === "plus" && currentUnits < item.countInStock) {
        currentUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits: currentUnits,
    };
  });

  updateCart();
}

console.log(typeof payInput);
