import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sliceText(text: string, lenght: number){
  if(text.length < lenght) return text;
  return text.slice(0, lenght) + '...';
}