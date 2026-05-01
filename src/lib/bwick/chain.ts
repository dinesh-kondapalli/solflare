import { coins } from "@cosmjs/stargate";
import { bech32 } from "bech32";

export const BWICK_CHAIN_ID = "bwick-1";
export const BWICK_CHAIN_NAME = "BWICK Chain";
export const BWICK_SYMBOL = "BWICK";
export const BWICK_DENOM = "ubwick";
export const BWICK_DECIMALS = 6;
export const BWICK_PREFIX = "bwick";
export const BWICK_HD_PATH = "m/44'/118'/0'/0/0";
export const BWICK_RPC_URL = "http://174.138.87.223:26657";
export const BWICK_LCD_URL = "http://174.138.87.223:1317";
export const BWICK_RELAYER_URL = "http://174.138.87.223:3080";

export const BWICK_GAS_PRICE = 0.025;
export const BWICK_SEND_GAS = "100000";

export function formatBwickAmount(amount: string | bigint): string {
  const raw = typeof amount === "bigint" ? amount.toString() : amount;
  const negative = raw.startsWith("-");
  const digits = negative ? raw.slice(1) : raw;
  const padded = digits.padStart(BWICK_DECIMALS + 1, "0");
  const whole = padded.slice(0, -BWICK_DECIMALS) || "0";
  const fraction = padded.slice(-BWICK_DECIMALS).replace(/0+$/, "");
  const normalizedWhole = new Intl.NumberFormat("en-US").format(Number(whole));

  return `${negative ? "-" : ""}${normalizedWhole}${fraction ? `.${fraction}` : ""}`;
}

export function parseBwickAmount(input: string): string {
  const value = input.trim();

  if (!/^\d+(\.\d{0,6})?$/.test(value)) {
    throw new Error("Enter a valid BWICK amount with up to 6 decimals.");
  }

  const [whole, fraction = ""] = value.split(".");
  const normalizedFraction = fraction.padEnd(BWICK_DECIMALS, "0");
  const normalized = `${whole}${normalizedFraction}`.replace(/^0+(?=\d)/, "");

  if (normalized === "0") {
    throw new Error("Amount must be greater than zero.");
  }

  return normalized;
}

export function formatBwickBalanceLabel(amount: string | bigint): string {
  return `${formatBwickAmount(amount)} ${BWICK_SYMBOL}`;
}

export function shortAddress(address: string, head = 8, tail = 6): string {
  if (address.length <= head + tail) {
    return address;
  }

  return `${address.slice(0, head)}...${address.slice(-tail)}`;
}

export function isValidBwickAddress(address: string): boolean {
  try {
    const decoded = bech32.decode(address);
    return decoded.prefix === BWICK_PREFIX;
  } catch {
    return false;
  }
}

export function createSendFee() {
  const feeAmount = Math.ceil(
    Number(BWICK_SEND_GAS) * BWICK_GAS_PRICE,
  ).toString();

  return {
    amount: coins(feeAmount, BWICK_DENOM),
    gas: BWICK_SEND_GAS,
  };
}
