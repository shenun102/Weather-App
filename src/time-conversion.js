// time-conversion.js
import { format, parse } from "date-fns";

// Convert date format yyyy-MM-dd to Monday, Tuesday etc

export function convertToDaysOfWeek(data) {
  const dateStrings = [];
  data.forEach((day) => dateStrings.push(day.date));
  const daysOfWeek = dateStrings.map((dateString) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "EEEE");
  });
  return daysOfWeek;
}


// Convert time HH:MM:SS to 1am, 4pm etc.

export function convertTime(timeStr) {
  // Parse the time string (HH:MM:SS) into a Date object
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  // Create a Date object with the time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // Format the time in 'h a' format (e.g., 5 pm, 4 pm)
  return format(date, "h a");
}
