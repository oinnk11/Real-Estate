const formatNumber = (number) => {
  if (number <= 0) {
    return 0;
  }
  const formattedNumber = new Intl.NumberFormat("en-IN").format(number);

  return formattedNumber;
};

export default formatNumber;
