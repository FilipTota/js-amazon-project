import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-OOP.js"; // this just run all the code inside this file without importing anything
// import "../data/cart-class.js"; // this just run all the code inside this file without importing anything
// we were using this import for practice

import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCart } from "../data/cart.js";

// OOP practice
// import "../data/car.js";

// Backend practice
// import "../data/backend-practice.js";

//--------------------------------------------------------------------------------------------------------------//
// Async await

// -> even better way to handel asynchronous code
// -> async await is a shortcut for promises
// -> makes a code a lot cleaner

const loadPage = async () => {
  // async makes a function return a promise
  // it basically wraps this console.log code in a promise

  // to catch errors in async await:
  try {
    // we can also use try catch with synchronous code/normal code

    // we can manually create an error using throw
    // throw "error1";

    await loadProductsFetch();
    // await loadCart(); -> await await only works with promises, it doesn't do anything with callback
    await new Promise((resolve, reject) => {
      // if we want to manually create an error inside promise:
      // throw "error2"; // this error wil go inside .catch() of promise, unless we have await promise, then it wil be thrown inside catch{}

      // second way of creating an error in promise is by creating a error in the future
      // throw doesn't work in the future
      // so if we want to create an error in the future (inside the function of loadCart)
      // we can use feature of a promise called reject
      loadCart(() => {
        // reject("error3"); // reject is a function that lets us create an error in the future (asynchronously)
        // it created an error in the future (asynchronously) and it goes to catch{}
        resolve();
      });
    });
    // const value = await new Promise((resolve) => {
    //   loadCart(() => {
    //     resolve("value1");
    //     // value1 will be saved inside value variable
    //   });
    // });
    // console.log("value :>> ", value);

    // after we load products and cart, we are gonna render the page:
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log("error :>> ", error);
    console.log("Unexpected error. Please try again later.");
  }

  // if we return something inside this function
  // return "value2";
  // return 'value2' gets converted to resolve('value2') -> return 'value2' = resolve('value2')
};
loadPage();
// .then((value) => {
//   console.log("next step");
//   // 'value 2' will be saved inside value parameters
//   console.log("value :>> ", value);
// });
// async lets us use await
// await lets us wait for a promise to finish before going to the next line

//--------------------------------------------------------------------------------------------------------------//
// Promises

// -> better way to handle asynchronous code
// -> similar to done() function
// -> let us wait for some code to finish, before going to the next step
// Promise is a class

// Promise.all lets us run mulitple promises at the same time
// and wait for all of them to finish
// Promise.all gets an array of promises and to go to next step we will use .then() to render order and payment summary
/*
Promise.all([
  // new Promise((resolve) => {
  //   loadProducts(() => {
  //     resolve("value1");
  //   });
  // }),
  // loadProducsFetch already returns a promise and we can use it inside Promise.all()
  // so all we need to do is to just call loadProductsFetch, we dont need to create new promise
  // fetch keeps our code cleaner because it can return a promise and we don't need to write all that extra code like with new Promise - loadCart
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  console.log("values :>> ", values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  // built in class and when we create a Promise, we need to give it a function
  // it's going to run this function immediately
  // console.log("promise");

  // Inner function gets a parameter called resolve
  // resolve is a function and it works very similar to jasmine done() function
  // resolve() lets us control when to go to the next step
  // example: (we will put some asynchronous code inside the Promise)
  loadProducts(() => {
    // it will run this function after loadProducts is finished
    // once this is finished we want to go on the next step
    // so here, we will call resolve function:
    resolve("value1");
    // we can give resolve() a value
    // this value is gonna be saved in a parameter inside .then
  });
})
  .then((value) => {
    // whatever we give to resolve, is gonna bi saved inside this parameter(value)
    // this lets us share value between two steps of the Promise

    // console.log("value :>> ", value);

    // to use resolve() again we will return new promise inside .then
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
    // .then is the next step of Promise
    // resolve() makes it go to the next step
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

// Why do we use Promises instead of callbacks?
// -> multiple callbacks cause a lot of nesting
// -> if we have a lot of callbacks we cause a lot of code indents
// -> promises lets us avoid that indent and makes the code easier to read

//  to load everything on first load
// loadProducts(() => {
//   // first step: we load products
//   // and once this is finished, the second step: call renderOrderSummary and renderPaymentSummary
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// nesting example:
// this code will load the products, wait for it to finish
// then load cart, wait for it to finish
// and then render order and payment summary
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
//--------------------------------------------------------------------------------------------------------------//
