// get cart data from localStorage
export let cart;

// to Mock this data inside test file
// when we load this file, we need to run this function so that we run this code at least once
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
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

// best practice is to have all the related code inside one file

export const saveToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (productId, productName, selectedValue) => {
  // instead of using productName we are gonna use product ID to identify if
  // it's not good practice to identify by product name because there could be two drifferent products with same name
  // that's why we need to use ID

  // to increase cart quantity if we add two same products (right now if we add to same products to cart quantity stays 1) we need to loop throught cart to check if the product aleary exists
  let matchingItem; // to save matching item and to figure out if item exists
  cart.forEach((cartItem) => {
    // if (productName === item.productName) {
    //   // saving item if already exists
    //   matchingItem = item;
    // }
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
    cart.push({
      productId,
      productName,
      quantity: selectedValue ? Number(selectedValue) : 1,
      deliveryOptionId: "1", // default deliveryOption
    });
  }
  // save cart to local storage to avoid loosing/reseting cart data on page reload
  saveToStorage();
};

export const removeFromCart = (productId) => {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
};

export const updateQuantity = (productId, newQuantity) => {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  // to update localStorage
  saveToStorage();
};

export const updateDeliveryOption = (productId, deliveryOptionId) => {
  // loop through the cart to find a product and update the deliveryOptionId of the product

  // find product
  let matchingItem; // to save matching item and to figure out if item exists
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  // we have updated cart so we need to save it in localStorage
  saveToStorage();
};

// practice loading cart from backend
export const loadCart = (fun) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log("xhr.response :>> ", xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
};

export const loadCartFetch = async () => {
  try {
    const response = await fetch("https://supersimplebackend.dev/cart");
    const cartTextResponse = await response.text();
    console.log("cartTextResponse :>> ", cartTextResponse);
    return cartTextResponse;
  } catch (error) {
    console.error(error);
  }
};
