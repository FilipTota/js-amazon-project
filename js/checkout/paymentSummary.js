import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export const renderPaymentSummary = () => {
  // to get total price of items inside order summary:
  // 1. loop through the cart
  // 2. for each product we need to multiply price and quantity (product price * quantity)
  // 3. add everything together
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    // get shipping & handeling
    // 1. loop through cart
    // 2. add all the shipping costs together
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  console.log("productPriceCents :>> ", productPriceCents);
  console.log("shippingPriceCents :>> ", shippingPriceCents);
};
