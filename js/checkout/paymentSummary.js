import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

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

  // calculate total price before tax
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  // calculate tax based of totalBeforeTaxCents (10% of totalBeforeTaxCents)
  const taxCents = totalBeforeTaxCents * 0.1;

  // order total
  const totalCents = totalBeforeTaxCents + taxCents;

  // get cart quantity total number
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // functionality to place order
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      // make request to the backend to create the order with /orders
      // to create order we need to use POST

      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // this tells our backend what type of data we are sending in our request
            // here we are gonna send some json (object)
          }, // header gives out backend more informations about our request
          body: JSON.stringify({
            // actual data we are gonna send to backedn
            cart: cart, // we can't sand an object directly, we need to convert it into a JSON string
          }),
        });

        // to get the data attached to the response:
        const order = await response.json(); // response.json is also asynchronous to we are gonna use await
        // console.log("order :>> ", order);
        addOrder(order);
      } catch (error) {
        console.error("error :>> ", error);
      }

      // after we create the order we should go to the orders page
      // we're gonna do that with window.location
      // window.location is a special object provided by JavaScript and it lets us control the URL at the top of the browser
      window.location.href = "orders.html"; // changes everything after /
      // orders.html is a 'filepath', current file is checkout.html, from which it starts nad after we change location it looks for a file called order.html
    });
};

// Additional exercises
export const isWeekend = (date) => {
  if (date) {
    const dayOfWeek = date.add(3, "days").format("dddd");
    if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") return "Weekend";
    return dayOfWeek;
  }
};
