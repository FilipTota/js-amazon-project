// Integration Test -> tests many units/pieces of the code working together

// we are gonna test renderOrderSummary function from orderSummary.js file
// this function creates a whole section on the checkout page and uses many different functions and libraries to create the page, not only one piece of code

import { renderOrderSummary } from "../../js/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

// add loadProducts
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe("Test suite: renderOrderSummary", () => {
  // renderOrderSummary loads a page (one section of the page)
  // when we are testing a page we need to test two things:
  // 1. How the page looks
  // 2. How the page behaves

  // had to move these variables outside beforeEach because of scope, now any code outside beforeEach can use this variables including our tests
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // Hooks - lets us run some code for each test
  // Hooks in Jasmine:
  // beforeEach() -> runs code before each test
  // afterEach() -> runs code after each test
  // beforeAll() -> runs code before all tests
  // afterAll() -> runs code after all tests

  // before each test we do some code setup, and with hooks we can share the code between our two tests

  // backend testing
  beforeAll((done) => {
    // jasmine has sa feature done() that waits for the code to finish
    // we need it because loadProducts is asynchronous
    // loadProducts(() => {
    //   done();
    // });
    // with done, beforeAll will not automaticaly go to the next step, it will just wait
    // and it will only go to the next step after we call this done() function

    // testing for loading products with fetch
    // loadProductsFetch return promise so we use .then for the next step
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    // beforeEach Hook
    spyOn(localStorage, "setItem"); // we need to mock localStorage setItem because we have removeFromCart() inside dellete link functionality and inside removeFromCart() we have saveToStorage() which modifies localStorage, and inside tests it's not recommended to modify localStorage

    // first we need to create a element in out test where the HTML for cart gets created/displayed
    // we need to create element with class .js-order-summary
    // we will create this element inside test.html file

    // get 'js-test-container' and put the 'js-order-summary' element inside that test container
    // we are also adding 'js-checkout-header-middle-section' element because we are getting jasmine error of reading undefined from renderCheckoutHeader() inside renderOrderSummary()
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header-middle-section"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      // returning default cart
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    // and now that the HTML and cart is set up for this function, we can call the function
    renderOrderSummary();
  });

  afterEach(() => {
    // cleanup code after each test
    document.querySelector(".js-test-container").innerHTML = ``; // to remove html from test page because it takes a lot of space and pushes our tests below
  });

  // 1. How the page looks
  it("Displays the cart", () => {
    // check if we have 2 elements on the page (from the two mocked product above)
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    // check if quantity is correct (from the two mocked product above)
    // to get just the text we are gonna use proprty .innerText (we expect the text to be equal to 'Quanityt: 2')
    // product quantity has some other code inside, but we want only text 'Quanityt: 2' so we will use another method of expect() --> toContain()
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2 "); // it does not have to be exact match like with toEqual(), as long as 'Quanityt: 2' is somewhere in this element (product quantity) that this expectation will pass
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
  });

  // 2. How the page behaves
  it("Removes a product", () => {
    // to test delete function

    // get delete link for the first product
    // to click the element using code we can use method .click()
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // when jasmine shows 'SPEC HAS NO EXPECTATIONS Removes a product' it means that we didn't put expect()
    // we expect that there is one product less:
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    ); // first there is 2 product and after delete we expect it to be just 1

    // more detailed check
    // check if first product is no longer on the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    // check if second product is still on the page (because we didn't delete it)
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null); // .not checks the opposite of what is next (in this case it check if product is not null - if it exists)

    // after deleting check if the cart itself is updated
    // first we need to import the cart so we can use it in this test
    // cart started out with 2 products inside, after removing first product, the cart should have the length of 1 and the remaining product should have productId2
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
