"use client";

import { BWICK_CHAIN_ID } from "./chain";
import type { EncryptedData } from "./encryption";

export const BWICK_STORAGE_KEY = "bwick.wallet.v1";

export type StoredWallet = {
  version: 1;
  chainId: string;
  address: string;
  label: string;
  backupConfirmed: boolean;
  encryptedMnemonic: EncryptedData;
  createdAt: string;
  updatedAt: string;
};

export function loadStoredWallet(): StoredWallet | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(BWICK_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StoredWallet;

    if (parsed.version !== 1 || parsed.chainId !== BWICK_CHAIN_ID) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredWallet(wallet: StoredWallet) {
  window.localStorage.setItem(BWICK_STORAGE_KEY, JSON.stringify(wallet));
}

export function clearStoredWallet() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(BWICK_STORAGE_KEY);
}
