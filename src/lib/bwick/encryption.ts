"use client";

import { fromBase64, toBase64 } from "@cosmjs/encoding";

export type EncryptedData = {
  ciphertext: string;
  iv: string;
  salt: string;
  iterations: number;
};

const ITERATIONS = 250000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toSafeBytes(bytes: Uint8Array) {
  return new Uint8Array(bytes);
}

async function deriveKey(
  password: string,
  salt: Uint8Array,
  usages: KeyUsage[],
) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toSafeBytes(salt),
      iterations: ITERATIONS,
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    usages,
  );
}

export async function encryptString(
  value: string,
  password: string,
): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, ["encrypt"]);
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: toSafeBytes(iv),
    },
    key,
    encoder.encode(value),
  );

  return {
    ciphertext: toBase64(new Uint8Array(ciphertext)),
    iv: toBase64(iv),
    salt: toBase64(salt),
    iterations: ITERATIONS,
  };
}

export async function decryptString(payload: EncryptedData, password: string) {
  const key = await deriveKey(password, fromBase64(payload.salt), ["decrypt"]);
  const iv = fromBase64(payload.iv);
  const ciphertext = fromBase64(payload.ciphertext);
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: toSafeBytes(iv),
    },
    key,
    toSafeBytes(ciphertext),
  );

  return decoder.decode(decrypted);
}
