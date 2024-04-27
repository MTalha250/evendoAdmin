export function toReadableDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export function capitalizeFirstLetter(text: string | undefined) {
  return text?.charAt(0).toUpperCase() + text!.slice(1);
}

export function toStringTime(date: Date) {
  const hours = date?.getHours().toString().padStart(2, '0');
  const min = date?.getMinutes().toString().padStart(2, '0');
  const sec = date?.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${min}:${sec}`;
  return timeString;
}