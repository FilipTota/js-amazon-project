// Class is basically object generator

// Classes have extra features fro OOP:
// 1. Constructor - lets us run some setup code after creating an object

class Cart {
  constructor(localStorageKey) {
    // works like a normal function... we can put the code inside and it will run that code
    // special thing about constructir is that, when we generate an object it will run this constructor automatically
    // great place to put our setup code:

    // cart.localStorageKey = "cart-oop";
    // businessCart.localStorageKey = "cart-business";
    // cart.loadFromStorage();
    // businessCart.loadFromStorage();
    // code above sets localStorageKey and loadFromStorage to each object generated
    // we did that outside this class (bottom of the page)

    // now that we have constructor we can place this code inside, but like this:
    this.localStorageKey = localStorageKey; // constructor parameter .... how do we save value into this parameter? (code where we generate object, bottom of the page)
    this.loadFromStorage();
    // this. points to the object that we generate
  }

  // adding property to a class (instead of cartItems: undefined, "like in object" in class we will use cartItems = underfined;)
  cartItems = undefined; // and with that, every object that we generate will have this property
  // new propery of localStorageKey:
  localStorageKey = undefined;

  // same as code above (where there values are set to undefined)
  //  cartItems;
  //  localStorageKey;

  // now lets move methods inside this class:
  loadFromStorage() {
    // every object we generate will have this method
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    // this. will give us the outer object (in our example this. is equal to cart.)
    // if the name of the object gets changed (const cart), we dont have to change cart.something throughout the code because we use this.something
    // code will always work, doesn't matter what the name of the object variable is
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId, productName, selectedValue) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      // if exists increase quantity by 1
      selectedValue
        ? (matchingItem.quantity += Number(selectedValue))
        : (matchingItem.quantity += 1);
    } else {
      // if item is not inside cart (no mathing) then we add it to cart
      this.cartItems.push({
        productId,
        productName,
        quantity: selectedValue ? Number(selectedValue) : 1,
        deliveryOptionId: "1", // default deliveryOption
      });
    }
    // save cart to local storage to avoid loosing/reseting cart data on page reload
    this.saveToStorage();
  }
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    // to update localStorage
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    // loop through the cart to find a product and update the deliveryOptionId of the product

    // find product
    let matchingItem; // to save matching item and to figure out if item exists
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    // we have updated cart so we need to save it in localStorage
    this.saveToStorage();
  }
}

// to generate cart class:
const cart = new Cart("cart-oop"); // constructor parameter
const businessCart = new Cart("cart-business"); // constructor parameter
// BTW each object we generate from a class is called Instance (of a class)

// each of this objects has propery called localStorageKey and they are currently undefined
// so we need to set this propery:
// cart.localStorageKey = "cart-oop";
// businessCart.localStorageKey = "cart-business";

// cart.loadFromStorage();
// businessCart.loadFromStorage();

console.log("cart :>> ", cart);
console.log("businessCart :>> ", businessCart);

// we can also check if an object is an instance of a class
console.log(businessCart instanceof Cart); // returns true
