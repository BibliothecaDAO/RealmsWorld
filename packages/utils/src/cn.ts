import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusableStyles =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
export const ellipsableStyles =
  "whitespace-nowrap text-ellipsis overflow-hidden";
