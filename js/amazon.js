// products variable is comming from /data/products.js file because we included it in the script element in our amazon.html file

// get from another file:
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// to combine all this html together
let productsHtml = "";

products.forEach((product) => {
  productsHtml += `
    <div class="product-container">
        <div class="product-image-container">
            <img
            class="product-image"
            src=${product.image}
            />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img
            class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
        </div>

        <div class="product-price">$${formatCurrency(product.priceCents)}</div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${
          product.name
        }" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;

// this function will not be moved to cart.js because it is updating the page where the cart is displyed and not the actual cart
export const updateCartQuantity = () => {
  // update total cart quantity
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  // add cart quantity to page (in shopping cart)
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
};

const displayMessageAdded = () => {
  // to prevent message being shown and disapearing quickly after one more press of add to cart button
  clearTimeout(timeoutId);

  // show message added
  const messageAdded = document.querySelector(`.js-added-to-cart`);
  messageAdded.classList.add(`added-to-cart-visible`);

  timeoutId = setTimeout(() => {
    messageAdded.classList.remove("added-to-cart-visible");
  }, 2000);
};

let timeoutId;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // add product to a cart
    // we can just push product object with data we want to load
    // however, when we clik this button how will we know whict product to add?
    // to solve this product we are gonna learn a feature of html called Data Attribute

    // Data Attribute is jus another html attribute
    // the purpose of data attribute is to attach any information to an element
    // exampele of data-attribute is in add to cart button above
    // we add data attribute after the class attribute

    // Data attributes have to start the name with data-, and then after dash, we can add any name we want (like in the example above -> data-procuct-name)w

    // .dataset -> gives us all data attributes that are attaced to this button
    // const productName = button.dataset.productName;
    // const productId = button.dataset.productId;

    // destructuring productName and productId
    // .dataset -> gives us all data attributes that are attaced to this button
    const { productId, productName } = button.dataset;

    const selectElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const selectedValue = selectElement.value;

    // to clean our code
    addToCart(productId, productName, selectedValue);
    updateCartQuantity();
    displayMessageAdded();
  });
});

updateCartQuantity();
