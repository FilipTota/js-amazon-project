import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";

const updateCheckoutCartQuantity = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  // add cart quantity to page (in checkout)
  document.querySelector(
    ".js-checkout-header-middle-section"
  ).innerHTML = `Checkout (${cartQuantity} items)`;
};

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // find mathing product (firt cart item inside products from product.js)
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
      // by having a matvhing product we can access image, name, price... that we can use to generate this html bellow
    }
  });
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">Delivery date: Wednesday, June 15</div>

        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingProduct.image}"
            />

            <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(
              matchingProduct.priceCents
            )}</div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-label-${
                  matchingProduct.id
                }">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                  matchingProduct.id
                }>
                Update
                </span>
                <input type="number" min="0" class="input-quantity-link js-input-quantity-link-${
                  matchingProduct.id
                }" />
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                  matchingProduct.id
                }">
                Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${
                  matchingProduct.id /* delivery option with product id because we want be able to select delivery option for each product in a cart...if we have input radio name with the same name value for every product then all of this will be shared*/
                }}"
                />
                <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}}"
                />
                <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}}"
                />
                <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
  updateCheckoutCartQuantity();
});

// display data saved inside cartSummaryHTML
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    // .remove() will remove it from the page (every element we get from DOM has .remove() method)
    container.remove();
    updateCheckoutCartQuantity();
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  const productId = link.dataset.productId;
  link.addEventListener("click", () => {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((save) => {
  save.addEventListener("click", () => {
    // do the opposite of "Update"
    const productId = save.dataset.productId;

    // productId used for specific element (container with it's own id, input with it's own id, quantityLabel with it's own id...)
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const inputLink = document.querySelector(
      `.js-input-quantity-link-${productId}`
    );
    const inputLinkValue = Number(inputLink.value); // convert to number

    // update quantity value
    updateQuantity(productId, inputLinkValue);

    // update quantity html on checkout products
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = inputLinkValue;

    // update checkout in the header
    updateCheckoutCartQuantity();

    container.classList.remove("is-editing-quantity");
  });
});
