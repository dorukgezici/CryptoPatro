import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFloat = (value?: number | string) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return value?.toFixed(2) || "0.00";
};

export const calculatePercentage = (a: number, b: number) =>
  Math.floor((a / b) * 100);
