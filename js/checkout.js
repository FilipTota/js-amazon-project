import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-OOP.js"; // this just run all the code inside this file without importing anything
import "../data/cart-class.js"; // this just run all the code inside this file without importing anything

// to load everything on first load
renderOrderSummary();
renderPaymentSummary();
