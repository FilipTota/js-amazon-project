export const formatCurrency = (priceCents) => {
  // convert cents to dollars and set it to two decimals
  return (Math.round(priceCents) / 100).toFixed(2);
  // .toFixed have some issues with rounding so we added Math.round() to price first and then .toFixed(2)
};

// default export example
export default formatCurrency;

// each file can only have one default export, so if we have only one thing that we want to export, this is a syntax that we can use
