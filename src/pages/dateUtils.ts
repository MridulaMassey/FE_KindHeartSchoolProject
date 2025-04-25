import { format, parse } from "date-fns";

export const formatDateString = (dateStr: string) => {
  try {
    if (/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{1,2}:\d{1,2}\s+[ap]m$/.test(dateStr)) {
      const parsedDate = parse(dateStr, "dd/MM/yyyy hh:mm:ss aa", new Date());
      return format(parsedDate, "MMMM d, yyyy");
    }
    return format(new Date(dateStr), "MMMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};
