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
