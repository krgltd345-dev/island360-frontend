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

export const ConvertCentToDollar = (amount) => {
  return amount / 100;
}

export const statusStyles = {
  'PENDING': "bg-amber-100 text-amber-700 border-amber-200",
  'CONFIRMED': "bg-emerald-100 text-emerald-700 border-emerald-200",
  'ACCEPTED': "bg-emerald-100 text-emerald-700 border-emerald-200",
  'PAID': "bg-emerald-100 text-emerald-700 border-emerald-200",
  "COMPLETED": "bg-slate-100 text-slate-700 border-slate-200",
  "CANCELLED": "bg-red-100 text-red-700 border-red-200",
  "EXPIRED": "bg-red-100 text-red-700 border-red-200",
  "REJECTED": "bg-red-100 text-red-700 border-red-200",
  "REFUNDED": "bg-slate-100 text-slate-700 border-slate-200",
};
