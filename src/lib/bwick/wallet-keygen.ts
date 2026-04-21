import { stringToPath } from "@cosmjs/crypto";
import { toBase64 } from "@cosmjs/encoding";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { BWICK_HD_PATH, BWICK_PREFIX } from "./chain";

export type GeneratedWallet = {
  address: string;
  mnemonic: string;
  pubkey: Uint8Array;
  pubkeyBase64: string;
};

const walletOptions = {
  hdPaths: [stringToPath(BWICK_HD_PATH)],
  prefix: BWICK_PREFIX,
};

async function toGeneratedWallet(
  wallet: DirectSecp256k1HdWallet,
): Promise<GeneratedWallet> {
  const [account] = await wallet.getAccounts();

  return {
    address: account.address,
    mnemonic: wallet.mnemonic,
    pubkey: account.pubkey,
    pubkeyBase64: toBase64(account.pubkey),
  };
}

export async function generateWallet() {
  const wallet = await DirectSecp256k1HdWallet.generate(24, walletOptions);

  return toGeneratedWallet(wallet);
}

export async function restoreWallet(mnemonic: string) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic.trim(),
    walletOptions,
  );

  return toGeneratedWallet(wallet);
}

export async function getSignerFromMnemonic(mnemonic: string) {
  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic.trim(), walletOptions);
}
