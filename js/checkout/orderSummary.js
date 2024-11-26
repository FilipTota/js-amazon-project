import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

// Additional exercises import
import { isWeekend as isSatSun } from "./paymentSummary.js";
// import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

// export with a curly brackets is called Named export
// default export syntax (without curly brackets), we can use it when we want to export only one thing from a file
// default export example inside money.js file

// // function from external library
// hello();

// // dayjs external library
// const today = dayjs();
// console.log("today :>> ", today);

// // get date in 7 days from today
// const deliveryDate = today.add(7, "days");
// console.log("deliveryDate :>> ", deliveryDate);

// // get fromatted date according to the string of tokens passed in
// const formatedDeliveryDate = deliveryDate.format("dddd, MMMM D"); // Monday, November 25
// console.log("formatedDeliveryDate :>> ", formatedDeliveryDate);

// function to use for rerendering html
export const renderOrderSummary = () => {
  let cartSummaryHTML = "";

  renderCheckoutHeader();

  const deliveryOptionsHTML = (matchingProduct, cartItem) => {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      // calculate delivery date
      const dateString = calculateDeliveryDate(deliveryOption);

      // calculate price
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      // only be checked if deliveriOption.id is equal to cartItem.deliveryOptionId
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id=${
          matchingProduct.id
        } data-delivery-option-id=${deliveryOption.id}>
            <input type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${
                matchingProduct.id /* delivery option with product id because we want be able to select delivery option for each product in a cart...if we have input radio name with the same name value for every product then all of this will be shared*/
              }}"
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString}</div>
            </div>
        </div>
      `;
    });

    return html;
  };

  cart.forEach((cartItem) => {
    // get product
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // get delivery option
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // calculate delivery date
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
          <div class="delivery-date">Delivery date: ${dateString}</div>
  
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
              <div class="product-quantity js-product-quantity-${
                matchingProduct.id
              }">
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
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                    matchingProduct.id
                  }" data-product-id="${matchingProduct.id}">
                  Delete
                  </span>
              </div>
              </div>
  
              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
          </div>
      </div>
      `;
    renderCheckoutHeader();
  });

  // display data saved inside cartSummaryHTML
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // // .remove() will remove it from the page (every element we get from DOM has .remove() method)
      // container.remove();

      // update page with MVC and not with DOM like commented code above
      renderOrderSummary();

      renderCheckoutHeader();

      // on delete rerender PaymentSummary
      renderPaymentSummary();
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
      renderCheckoutHeader();

      // on save rerender PaymentSummary
      renderPaymentSummary();

      container.classList.remove("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((deliveryOption) => {
    deliveryOption.addEventListener("click", () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      // to access productId and deliveryOptionId, inside deliveryOptionsHTML() function we have access to matchingProduct and also for deliveryOptionId which is inside deliverOptions.forEach
      // both of these values can be passed to html that we generate for delivery options
      // which means we can pass these values inside delivery-option div element through Data attributes (data-product-id & data-delivery-option-id)

      // to update page and to rerender html again we can use the renderOrderSummary function
      // this will be usefull to update the page, with this specific code we will update Delivery date for each delivery option change
      // instead of using DOM to update the page instead we will re-run all the code above
      // this proccess is called MVC (Model-View-Controller), and it's known as design pattern (many JavaScript frameforks are based on MVC)
      // Model - all the code that saves and manages the data
      // View - code that takes the data and displays it on the page
      // Controller - runs some code when we interact with the page (for example event listeners)
      // we use MVC to make sure that the page always matches the data
      renderOrderSummary();

      // on delivery chane rrerender PaymentSummary
      renderPaymentSummary();

      // function can call/re-run itself
      // this feature is called recursion
      // it's usefull when function needs to call/re-run all of it's code
    });
  });
};

// Additional exercises
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const today = dayjs();
console.log("today :>> ", today);

// get date 5 days after today
const fiveDaysAfterToday = today.add(5, "days");
console.log("fiveDaysAfterToday :>> ", fiveDaysAfterToday);

// dispplay it in format '<Month> <Day of Month>'
const formatedDate = fiveDaysAfterToday.format("MMMM DD");
console.log("formatedDate :>> ", formatedDate);

// calculate 1 month after today and display it in the same format as above
const monthAfterToday = today.add(1, "month").format("MMMM DD");
console.log("monthAfterToday :>> ", monthAfterToday);

// calculate one month before today and display it in the same format as above
const monthBeforeToday = today.subtract(1, "month").format("MMMM DD");
console.log("monthBeforeToday :>> ", monthBeforeToday);

// get a date and disply it in this format: <Day of Week>
const dayOfWeek = today.format("dddd");
console.log("dayOfWeek :>> ", dayOfWeek);

// create function that takes a DayJS object and returns whether the date is Saturday of Sunday
// const isWeekend = (date) => {
//   // const dayOfWeek = today.format("dddd");
//   const dayOfWeek = date.add(3, "days").format("dddd");
//   if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") return "Weekend";
//   return dayOfWeek;
// };
// console.log("isWeekend(today) :>> ", isWeekend(today));

// place isWeekend() in other file and export it here
// console.log("isWeekend(today) :>> ", isWeekend(today));
// change iwWeekend name with import above
console.log("isSatSun(today) :>> ", isSatSun(today));
