// to save our orders
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

const saveToStorage = () => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const getOrder = (orderId) => {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
};

export const getOrderProductDetails = (productId, order) => {
  let matchingProduct;
  order.products.forEach((orderProduct) => {
    if (orderProduct.productId === productId) {
      matchingProduct = orderProduct;
    }
  });
  return matchingProduct;
};

export const addOrder = (order) => {
  orders.unshift(order); // add order to the front of the array (first place)
  console.log("orders :>> ", orders);
  saveToStorage();
};
