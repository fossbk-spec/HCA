import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number): string {
  return `${Math.abs(year).toLocaleString("en-US")} ${year < 0 ? "BCE" : "CE"}`;
}
