export const formatCurrency = (priceCents) => {
  // convert cents to dollars and set it to two decimals
  return (priceCents / 100).toFixed(2);
};

// default export example
export default formatCurrency;

// each file can only have one default export, so if we have only one thing that we want to export, this is a syntax that we can use
