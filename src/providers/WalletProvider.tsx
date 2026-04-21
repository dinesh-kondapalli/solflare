"use client";

import { toBase64 } from "@cosmjs/encoding";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import {
  BWICK_CHAIN_ID,
  BWICK_DENOM,
  BWICK_SYMBOL,
  createSendFee,
  isValidBwickAddress,
  parseBwickAmount,
} from "@/lib/bwick/chain";
import { decryptString, encryptString } from "@/lib/bwick/encryption";
import {
  clearStoredWallet,
  loadStoredWallet,
  type StoredWallet,
  saveStoredWallet,
} from "@/lib/bwick/storage";
import {
  generateWallet,
  getSignerFromMnemonic,
  restoreWallet,
} from "@/lib/bwick/wallet-keygen";

type WalletStatus = "loading" | "empty" | "locked" | "unlocked";

type WalletAccountState = {
  accountNumber: number;
  sequence: number;
  exists: boolean;
};

type WalletBalanceState = {
  amount: string;
  display: string;
};

type WalletContextValue = {
  status: WalletStatus;
  address: string | null;
  label: string;
  account: WalletAccountState | null;
  balance: WalletBalanceState;
  lastTxHash: string | null;
  isRefreshing: boolean;
  createWallet: (input: {
    password: string;
    label?: string;
  }) => Promise<string>;
  importWallet: (input: {
    mnemonic: string;
    password: string;
    label?: string;
  }) => Promise<void>;
  unlock: (password: string) => Promise<void>;
  lock: () => void;
  removeWallet: () => void;
  refresh: () => Promise<void>;
  send: (input: {
    recipient: string;
    amount: string;
    memo?: string;
  }) => Promise<string>;
};

const defaultBalance: WalletBalanceState = {
  amount: "0",
  display: `0 ${BWICK_SYMBOL}`,
};

const WalletContext = createContext<WalletContextValue | null>(null);

const sendInputSchema = z.object({
  recipient: z.string().min(1, "Recipient is required."),
  amount: z.string().min(1, "Amount is required."),
  memo: z.string().optional(),
});

type FetchInit = NonNullable<Parameters<typeof fetch>[1]>;

async function fetchJson<T>(url: string, init?: FetchInit) {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
  });
  const data = (await response.json()) as T | { error?: string };

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Request failed.";

    throw new Error(errorMessage);
  }

  return data as T;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>("loading");
  const [storedWallet, setStoredWallet] = useState<StoredWallet | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [account, setAccount] = useState<WalletAccountState | null>(null);
  const [balance, setBalance] = useState<WalletBalanceState>(defaultBalance);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const existing = loadStoredWallet();
    setStoredWallet(existing);
    setStatus(existing ? "locked" : "empty");
  }, []);

  const hydratePortfolio = useCallback(async (address: string) => {
    setIsRefreshing(true);

    try {
      const [accountResponse, balancesResponse] = await Promise.all([
        fetchJson<WalletAccountState>(`/api/bwick/account/${address}`),
        fetchJson<{ bwickBalance: WalletBalanceState }>(
          `/api/bwick/balances/${address}`,
        ),
      ]);

      setAccount(accountResponse);
      setBalance(balancesResponse.bwickBalance);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const persistWallet = useCallback(
    async ({
      address,
      label,
      mnemonic: walletMnemonic,
      password,
    }: {
      address: string;
      label?: string;
      mnemonic: string;
      password: string;
    }) => {
      const now = new Date().toISOString();
      const nextWallet: StoredWallet = {
        version: 1,
        chainId: BWICK_CHAIN_ID,
        address,
        label: label?.trim() || "Main Wallet",
        encryptedMnemonic: await encryptString(walletMnemonic, password),
        createdAt: now,
        updatedAt: now,
      };

      saveStoredWallet(nextWallet);
      setStoredWallet(nextWallet);
      setMnemonic(walletMnemonic);
      setStatus("unlocked");
      setLastTxHash(null);
      await hydratePortfolio(address);
    },
    [hydratePortfolio],
  );

  const createWalletAction = useCallback<WalletContextValue["createWallet"]>(
    async ({ password, label }) => {
      const generated = await generateWallet();

      await persistWallet({
        address: generated.address,
        label,
        mnemonic: generated.mnemonic,
        password,
      });

      return generated.mnemonic;
    },
    [persistWallet],
  );

  const importWalletAction = useCallback<WalletContextValue["importWallet"]>(
    async ({ mnemonic: inputMnemonic, password, label }) => {
      const restored = await restoreWallet(inputMnemonic);

      await persistWallet({
        address: restored.address,
        label,
        mnemonic: restored.mnemonic,
        password,
      });
    },
    [persistWallet],
  );

  const unlockAction = useCallback<WalletContextValue["unlock"]>(
    async (password) => {
      const existing = loadStoredWallet();

      if (!existing) {
        setStatus("empty");
        throw new Error("No wallet found.");
      }

      const decryptedMnemonic = await decryptString(
        existing.encryptedMnemonic,
        password,
      );
      const restored = await restoreWallet(decryptedMnemonic);

      if (restored.address !== existing.address) {
        throw new Error("Stored wallet data is invalid.");
      }

      setStoredWallet(existing);
      setMnemonic(decryptedMnemonic);
      setStatus("unlocked");
      await hydratePortfolio(existing.address);
    },
    [hydratePortfolio],
  );

  const lockAction = useCallback(() => {
    if (!storedWallet) {
      setStatus("empty");
      return;
    }

    setMnemonic(null);
    setAccount(null);
    setBalance(defaultBalance);
    setStatus("locked");
  }, [storedWallet]);

  const removeWalletAction = useCallback(() => {
    clearStoredWallet();
    setStoredWallet(null);
    setMnemonic(null);
    setAccount(null);
    setBalance(defaultBalance);
    setLastTxHash(null);
    setStatus("empty");
  }, []);

  const refreshAction = useCallback(async () => {
    if (!storedWallet) {
      return;
    }

    await hydratePortfolio(storedWallet.address);
  }, [hydratePortfolio, storedWallet]);

  const sendAction = useCallback<WalletContextValue["send"]>(
    async (input) => {
      const parsed = sendInputSchema.parse(input);

      if (!storedWallet || !mnemonic) {
        throw new Error("Unlock your wallet first.");
      }

      if (!isValidBwickAddress(parsed.recipient)) {
        throw new Error("Recipient address is not a valid BWICK address.");
      }

      const amount = parseBwickAmount(parsed.amount);
      const signer = await getSignerFromMnemonic(mnemonic);
      const [signerAccount] = await signer.getAccounts();
      const offlineClient = await SigningStargateClient.offline(signer);
      const txRaw = await offlineClient.sign(
        signerAccount.address,
        [
          {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: MsgSend.fromPartial({
              fromAddress: signerAccount.address,
              toAddress: parsed.recipient,
              amount: [{ amount, denom: BWICK_DENOM }],
            }),
          },
        ],
        createSendFee(),
        parsed.memo?.trim() || "",
        {
          accountNumber: account?.accountNumber ?? 0,
          sequence: account?.sequence ?? 0,
          chainId: BWICK_CHAIN_ID,
        },
      );

      const response = await fetchJson<{ transactionHash: string }>(
        "/api/bwick/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            txBase64: toBase64(TxRaw.encode(txRaw).finish()),
          }),
        },
      );

      setLastTxHash(response.transactionHash);
      await hydratePortfolio(storedWallet.address);

      return response.transactionHash;
    },
    [
      account?.accountNumber,
      account?.sequence,
      hydratePortfolio,
      mnemonic,
      storedWallet,
    ],
  );

  const value = useMemo<WalletContextValue>(
    () => ({
      status,
      address: storedWallet?.address ?? null,
      label: storedWallet?.label ?? "Main Wallet",
      account,
      balance,
      lastTxHash,
      isRefreshing,
      createWallet: createWalletAction,
      importWallet: importWalletAction,
      unlock: unlockAction,
      lock: lockAction,
      removeWallet: removeWalletAction,
      refresh: refreshAction,
      send: sendAction,
    }),
    [
      account,
      balance,
      createWalletAction,
      importWalletAction,
      isRefreshing,
      lastTxHash,
      lockAction,
      refreshAction,
      removeWalletAction,
      sendAction,
      status,
      storedWallet?.address,
      storedWallet?.label,
      unlockAction,
    ],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider.");
  }

  return context;
}
