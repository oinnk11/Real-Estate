import getRelativeDay from "../../utils/getRelativeDay.js";

const DateSeparator = ({ date }) => {
  const label = getRelativeDay(date);

  return <div className="text-center text-sm text-muted">{label}</div>;
};
export default DateSeparator;
