import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), delay);
  };
}

export const getTruncatedDescription = (
  text: string,
  limit: number,
  isExpanded: boolean,
): string => {
  return text.length > limit && !isExpanded
    ? `${text.slice(0, limit)}...`
    : text;
};
