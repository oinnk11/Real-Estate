const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat("ne-NP").format(number);

  return formattedNumber;
};

export default formatNumber;
