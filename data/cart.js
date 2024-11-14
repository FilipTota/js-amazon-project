export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

// best practice is to have all the related code inside one file

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
    });
  }
};

export const removeFromCart = (productId) => {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
};
