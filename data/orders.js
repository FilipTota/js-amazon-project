// to save our orders
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

const saveToStorage = () => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const addOrder = (order) => {
  orders.unshift(order); // add order to the front of the array (first place)
  console.log("orders :>> ", orders);
  saveToStorage();
};
