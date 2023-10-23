export function shortDayName(day: number): string {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day]?.slice(0, 3) || '';
}

export function shortMonthName(month: number): string {
  var months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
  return months[month]?.slice(0, 3) || '';
}

export function formatTime(time: string): string {
  if (!time) return '';
  const timeSplits = time?.split(':');

  if (timeSplits?.length < 2) return '';
  if (!timeSplits[0] || !timeSplits[1]) return '';
  if ((parseInt(timeSplits[0]) > 23) || parseInt(timeSplits[1]) > 59) return '';
  if ((parseInt(timeSplits[0]) < 0) || parseInt(timeSplits[1]) < 0) return '';

  const hours = timeSplits[0] ? parseInt(timeSplits[0], 10) : 0;
  const minutes = timeSplits[1] ? parseInt(timeSplits[1], 10) : 0;

  return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
}

export function extractTime(dateTime: string): string {
  const convertedDateTime: Date = new Date(dateTime);
  if (convertedDateTime.toString() === 'Invalid Date') return '';
  return `${(convertedDateTime.getHours()).toString().padStart(2, '0')}:${(convertedDateTime.getMinutes()).toString().padStart(2, '0')}`;
}

export function extractDate(dateTime: string): string {
  const convertedDateTime: Date = new Date(dateTime);
  if (convertedDateTime.toString() === 'Invalid Date') return '';
  return `${shortDayName(convertedDateTime.getDay())} ${(convertedDateTime.getDate()).toString().padStart(2, '0')} ${shortMonthName(convertedDateTime.getMonth())}`;
}