import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: add to cart", () => {
  // test for when the product is already in the cart
  it("adds an existing product to the cart", () => {
    // a mock only last for 1 test, once this test is finnished the method is no longer mocked
    // that's why in this test we also need to mock localStorage.setItem
    spyOn(localStorage, "setItem");
    // first we need to set up cart that it already contains a product we want to add
    // to do that we are gonna mock localStorage.getItem again
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveyOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1); // stays the same (one producst inside cart)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2); // changes from 1 to 2, quantity increased by 1
  });
  // test for when the product is not in the cart( else condition)
  it("adds a new product to the cart", () => {
    // in our addToCart function we also have function saveToStorage which will save data to localStorage, because this is just test code we dont want our test code to be modifying localStorage and to be affecting our real code
    // to prevent this we will also mock localStorage.setItem
    spyOn(localStorage, "setItem");

    // and remember that order matters
    // first we want to mock our data and then we call addToCart

    // create a Mock with feature spyOn
    // first paragraph is an object we want to mock (in out example it's localStorage)
    // second paragraph is a string and in this string we be a method we want to mock (in out example it's getItem)

    spyOn(localStorage, "getItem").and.callFake(() => {
      // spyOn gives us an object, and this object has a property we can use (in out example we use propery .and)
      // .and also gives us an object and with that we call method .callFake() which will have function and in this function we set what we want to getItem to do
      // in our example we want to get empty array (we want cart to be empty)

      // localStorage only supports strings so we need to stringify empty array
      return JSON.stringify([]);
    });

    // after we mock localStorage, we're going to load cart again
    loadFromStorage();
    // so now when we mock out cart data to empty array, and we use loadFromStorage, cart inside cart.js will be an empty array
    // and now in out test when we add product to an empty cart
    // the empty cart will be equal to 1

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    // check if cart.length is correct
    expect(cart.length).toEqual(1);
    // test still return failure and the reson is that we have imported cart inside this file, and that cart item is already set, we want to reload cart after we mock data
    // to solve this we will create a function inside cart.js to reload cart again

    // we assume that cart.length is 0 at start and when we add new product, cart.length should be 1
    // but
    // in our example we have cart saved in localStorage, and if cart is empty we add data (this is in cart.js)
    // so with that code, we cannot have empty cart and this test fails

    // this test is known as flaky test -> test that sometimes passes and sometimes fails, even if we don't change the code

    // to solve this problem we are gonna use a feature of jasmine called Mocks
    // a Mock lets us replace a method with a fake version and then we can make this fake version do whatever we want

    // in our test, setItem is mocked, so we can't realy check what is inside localStorage
    // instead we can just check if addToCart calls setItem at some point
    // to check if setItem was called we can use expect function:
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we gave it number 1 because we expect it to be called once
    // this method only works if localStorage has been mocked with spyOn

    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
