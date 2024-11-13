export const formatCurrency = (priceCents) => {
  // convert cents to dollars and set it to two decimals
  return (priceCents / 100).toFixed(2);
};
