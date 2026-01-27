import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  user: 'USER',
  admin: 'ADMIN',
  supAdmin: 'SUPER_ADMIN',
  vendor: 'VENDOR'
}
