import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AUTH_REQUERED_PAGES } from "@/constans/constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAuthPages = (url: string) =>
  AUTH_REQUERED_PAGES.some((page) => page.startsWith(url));
