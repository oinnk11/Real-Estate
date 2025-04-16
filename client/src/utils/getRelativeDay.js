import { format, isThisWeek, isToday, isYesterday } from "date-fns";

const getRelativeDay = (date) => {
  if (!date) return "";

  const accDate = new Date(date);
  const formattedTime = format(accDate, "hh:mm a");

  if (isToday(date)) {
    return `Today, ${formattedTime}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${formattedTime}`;
  } else if (isThisWeek(date)) {
    return format(accDate, "EEEE, hh:mm a");
  } else {
    return format(accDate, "MMM d, yyyy");
  }
};

export default getRelativeDay;
