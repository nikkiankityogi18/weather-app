function formatDate(dateString) {
  const dateParts = dateString.split(" ")[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Convert month number to month name abbreviation
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Construct formatted date string (assuming format "dd Mon")
  const formattedDate = `${parseInt(day, 10)} ${monthName}`;

  return formattedDate;
}

function formatTime(timeString) {
  const timeParts = timeString.split(":");
  const hours = timeParts[0];
  const minutes = timeParts[1];

  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12; // If hours is 0, convert it to 12

  const formattedTime = `${hours12}:${minutes} ${period}`;

  return formattedTime;
}

export function formatDateTime(dateTimeString) {
  const datePart = formatDate(dateTimeString);
  const timePart = formatTime(dateTimeString.split(" ")[1]);

  const formattedDateTime = `${datePart}\n${timePart}`;

  return formattedDateTime;
}
