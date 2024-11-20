import { cart } from "../../data/cart.js";

export const renderCheckoutHeader = () => {
  let cartQuantity = 0;
  // get total quantity
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // update Checkout HTML
  let headerCheckoutHTML = `
    Checkout(${cartQuantity} items)
  `;

  //   display HTML on the page
  document.querySelector(".js-checkout-header-middle-section").innerHTML =
    headerCheckoutHTML;

  //   // add cart quantity to page (in checkout)
  //   document.querySelector(
  //     ".js-checkout-header-middle-section"
  //   ).innerHTML = `Checkout (${cartQuantity} items)`;

  // wont be using commented code like this with DOM, instead we will use this function to rerender the checkout on the page inside orderSummary.js file
};
