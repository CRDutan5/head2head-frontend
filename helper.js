export function dateFormatted(receivedDate) {
  const dateObj = new Date(receivedDate);
  const date = dateObj.toLocaleDateString();
  return date;
}

export function timeFormatted(receivedDate) {
  const dateObj = new Date(receivedDate);
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}
