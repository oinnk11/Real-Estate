import { format } from "date-fns";

const formatDate = (date, style = "do MMM, yyyy") => {
  return format(new Date(date), style);
};

export default formatDate;
