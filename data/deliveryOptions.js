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

// function to check is given date is Saturday or Sunday
const isWeekend = (date) => {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
};

// calcualte delivery days but skip weekend (Saturday & Sunday)
// Example: if today is Friday, and we choose 1 day delivery date, we wont get this delivery on Saturday, we will skip weekend and get delivery on Monday
export const calculateDeliveryDate = (deliveryOption) => {
  // get todays date
  let deliveryDate = dayjs();
  // get delivery days saved as remaining days because we will drecrease delivery days with each loop (if it is not weekend)
  let remainingDays = deliveryOption.deliveryDays;

  while (remainingDays > 0) {
    // add one day to today if is not weekend
    deliveryDate = deliveryDate.add(1, "days");
    // decrease remaining days if date is not weekend (Saturday or Sunday)
    // not decreasing on weekend because we want to skip it
    if (!isWeekend(deliveryDate)) remainingDays--;
  }

  // format date to a wanted string
  let dateString = deliveryDate.format("dddd, MMMM D");
  // console.log("dateString :>> ", dateString);

  return dateString;
};
