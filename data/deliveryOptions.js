import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export const getDeliveryOption = (deliveryOptionId) => {
  // to store delivery option result
  let deliveryOption;
  // loop through delivery options to find
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0]; // adding default value to be safe
};

export const calculateDeliveryDate = (deliveryOption) => {
  // get todays date
  const today = dayjs();

  // calculate delivery date based on the deliveryOptions variable
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  // console.log("deliveryDate :>> ", deliveryDate);

  // format date to a wanted string
  const dateString = deliveryDate.format("dddd, MMMM D");
  // console.log("dateString :>> ", dateString);

  return dateString;
};
