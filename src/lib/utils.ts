import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number): string {
  return `${Math.abs(year).toLocaleString("en-US")} ${year < 0 ? "BCE" : "CE"}`;
}

export function formatYearVi(year: number): string {
  return `${Math.abs(year).toLocaleString("vi-VN")} ${year < 0 ? "TCN" : "SCN"}`;
}

export function formatLifespanBilingual(birthYear: number | null, deathYear: number | null, isVi: boolean): string | null {
  if (birthYear === null && deathYear === null) return null;
  const yearText = (y: number) => {
    if (!isVi) return formatYear(y);
    return y < 0 ? `${Math.abs(y)} TCN` : `${y}`;
  };
  if (birthYear === null) return isVi ? `Mất năm ${yearText(deathYear!)}` : `Died ${formatYear(deathYear!)}`;
  if (deathYear === null) return isVi ? `Sinh năm ${yearText(birthYear)}` : `Born ${formatYear(birthYear)}`;
  return `${yearText(birthYear)} – ${yearText(deathYear)}`;
}

export function formatLifespan(birthYear: number | null, deathYear: number | null): string | null {
  return formatLifespanBilingual(birthYear, deathYear, false);
}
