// cart.js converted into OOP - Object-Oriented Programming

// OOP - organize our code into objects
// we group our data and functions together into an object

// Why do we use OOP?
// OOP tries to represent the real world
// -> we take a real life physical object like a shopping cart and convert it into digial object
// -> we can have products inside that shopping cart, we can also have some 'functions' like add product to cart, remove product from cart... same goes into our digital cart object
// OOP - some people feels like OOP makes a code more intuitive (easier to understand)

// use Capital first letter for function that create objects (PascalCase)
function Cart(localStorageKey) {
  // parameter localStorageKey is used to getItem and setItem to localStorage to have new data inside localStorage when generating different/new object
  // not we can pas name of localStoreage whatever we want and for each new object, new localStorage will be created/saved

  // crete cart objects
  const cart = {
    cartItems: undefined,
    // shorthand method syntax for functions:
    // instead of writing loadFromStorage: () {}, we can just write loadFromStorage() {}
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
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
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
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
    },
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
        }
      });
      // to update localStorage
      this.saveToStorage();
    },
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
    },
  };

  return cart;
}

// run Cart function to generate the object:
const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");
// this is a better way of generating new objects... instead of copy pasting code everytime, we created function that generates objects

cart.loadFromStorage();
// accessing loadFromStorage() from outside of cart object with cart.loadFromStorage()
// this.loadFromStorage() would be used inside cart object

console.log("cart :>> ", cart);

// Another reason we use OOP is that it' easy to create multiple objects
// Example with setting second shopping cart for business purchase (like on amazon website)
// -> we can just make a copy of the cart object:

// to espace to much same code we will make a function to generate objects
// const businessCart = {
//   cartItems: undefined,
//   // shorthand method syntax for functions:
//   // instead of writing loadFromStorage: () {}, we can just write loadFromStorage() {}
//   loadFromStorage() {
//     this.cartItems = JSON.parse(localStorage.getItem("cart-business"));
//     // this. will give us the outer object (in our example this. is equal to cart.)
//     // if the name of the object gets changed (const cart), we dont have to change cart.something throughout the code because we use this.something
//     // code will always work, doesn't matter what the name of the object variable is
//     if (!this.cartItems) {
//       this.cartItems = [
//         {
//           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//           quantity: 2,
//           deliveryOptionId: "1",
//         },
//         {
//           productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//           quantity: 1,
//           deliveryOptionId: "2",
//         },
//       ];
//     }
//   },
//   saveToStorage() {
//     localStorage.setItem("cart-business", JSON.stringify(this.cartItems));
//   },
//   addToCart(productId, productName, selectedValue) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (productId === cartItem.productId) {
//         matchingItem = cartItem;
//       }
//     });

//     if (matchingItem) {
//       // if exists increase quantity by 1
//       selectedValue
//         ? (matchingItem.quantity += Number(selectedValue))
//         : (matchingItem.quantity += 1);
//     } else {
//       // if item is not inside cart (no mathing) then we add it to cart
//       this.cartItems.push({
//         productId,
//         productName,
//         quantity: selectedValue ? Number(selectedValue) : 1,
//         deliveryOptionId: "1", // default deliveryOption
//       });
//     }
//     // save cart to local storage to avoid loosing/reseting cart data on page reload
//     this.saveToStorage();
//   },
//   removeFromCart(productId) {
//     const newCart = [];
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId !== productId) {
//         newCart.push(cartItem);
//       }
//     });

//     this.cartItems = newCart;
//     this.saveToStorage();
//   },
//   updateQuantity(productId, newQuantity) {
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         cartItem.quantity = newQuantity;
//       }
//     });
//     // to update localStorage
//     this.saveToStorage();
//   },
//   updateDeliveryOption(productId, deliveryOptionId) {
//     // loop through the cart to find a product and update the deliveryOptionId of the product

//     // find product
//     let matchingItem; // to save matching item and to figure out if item exists
//     this.cartItems.forEach((cartItem) => {
//       if (productId === cartItem.productId) {
//         matchingItem = cartItem;
//       }
//     });

//     matchingItem.deliveryOptionId = deliveryOptionId;

//     // we have updated cart so we need to save it in localStorage
//     this.saveToStorage();
//   },
// };

// cart.loadFromStorage();

// we created completely seperate object by copying cart object
// so OOP makes it easy to create multiple objects
businessCart.loadFromStorage();

console.log("cart :>> ", cart);
console.log("businessCart :>> ", businessCart);
