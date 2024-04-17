// export function dateFormatted(receivedDate) {
//   const dateObj = new Date(receivedDate);
//   const date = dateObj.toLocaleDateString();
//   return date;
// }

// export function timeFormatted(receivedDate) {
//   const dateObj = new Date(receivedDate);
//   const time = dateObj.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return time;
// }

export function dateFormatted(receivedDate) {
  if (!receivedDate) return ""; // Return empty string if receivedDate is undefined or null
  // Extracting only the date part by slicing the string
  const date = receivedDate.slice(0, 10); // Extracts characters from index 0 to 9 (inclusive)
  return date;
}

export function timeFormatted(receivedDate) {
  if (!receivedDate) return ""; // Return empty string if receivedDate is undefined or null
  // Extracting only the time part by slicing the string
  const timeString = receivedDate.slice(11, 16); // Extracts characters from index 11 to 15 (inclusive)
  // Parsing hours and minutes from the time string
  const [hours, minutes] = timeString.split(":").map(Number);
  // Formatting hours to 12-hour format with AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
  // Returning formatted time string with AM/PM
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

export function formatTime(receivedDate) {
  if (!receivedDate) return ""; // Return empty string if receivedDate is undefined or null
  // Extracting only the time part by slicing the string
  const timeString = receivedDate.slice(11, 16); // Extracts characters from index 11 to 15 (inclusive)
  return timeString;
}

export function formatDateAndTime(dateString, timeString) {
  // // Split the date and time strings
  // const [year, month, day] = dateString.split("-");
  // let [hours, minutes] = timeString.split(":");
  // // Check if the time string contains AM or PM
  // const isPM = timeString.toUpperCase().includes("PM");
  // // Convert hours to 24-hour format if necessary
  // if (isPM && hours !== "12") {
  //   hours = String(Number(hours) + 12);
  // } else if (!isPM && hours === "12") {
  //   hours = "00";
  // }
  // // Create a new Date object in local time
  // const localDate = new Date(year, month - 1, day, hours, minutes);
  // // Adjust for timezone offset
  // const timezoneOffset = localDate.getTimezoneOffset() * 60000; // in milliseconds
  // const localTimeWithOffset = localDate.getTime() + timezoneOffset;
  // const localDateWithOffset = new Date(localTimeWithOffset);
  // // Format the date in ISO 8601 format
  // const formattedDate = localDateWithOffset.toISOString();
  // return formattedDate;
}

// Test the function
