import { appendFileSync } from "fs";

export function responseMessage(
  message: string | null = null,
  body: any = null
) {
  return { message, body };
}

export function isMeterNumberValid(number: string): boolean {
  if (!number || number.length != 6) return false;
  else return true;
}

export function isAmountValid(amount: number): boolean {
  if (amount < 100) return false;
  if (amount % 100 == 0) return false;
  if (amount > 182500) return false;

  return true;
}

export function isTokenValid(token: string): boolean {
  if (!token || token.length != 6) return false;
  else return true;
}
