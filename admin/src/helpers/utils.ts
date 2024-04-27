import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function capitalizeAndReplace(str: string) {
  return str.replace(/(?:^|-)\w/g, function (match: any) {
    return match.toUpperCase();
  }).replace(/-/g, ' ');
}