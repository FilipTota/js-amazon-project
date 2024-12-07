import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-OOP.js"; // this just run all the code inside this file without importing anything
// import "../data/cart-class.js"; // this just run all the code inside this file without importing anything
// we were using this import for practice

import { loadProducts } from "../data/products.js";

// OOP practice
// import "../data/car.js";

// Backend practice
// import "../data/backend-practice.js";

// to load everything on first load
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
