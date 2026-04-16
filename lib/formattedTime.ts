export function getFormattedDate(dt: number) {
  const date = new Date(dt * 1000);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  return `${dayOfWeek} ${getOrdinalSuffix(day)} ${monthName} ${year}`;
}

export function getFormattedTime(timestamp: number, timezoneOffset: number = 0) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
