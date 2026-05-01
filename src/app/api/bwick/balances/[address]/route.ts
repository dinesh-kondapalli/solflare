import { NextResponse } from "next/server";
import { z } from "zod";
import {
  BWICK_DENOM,
  BWICK_LCD_URL,
  formatBwickBalanceLabel,
} from "@/lib/bwick/chain";

const paramsSchema = z.object({
  address: z.string().min(1),
});

export async function GET(
  _request: Request,
  context: { params: Promise<{ address: string }> },
) {
  const params = paramsSchema.parse(await context.params);
  const response = await fetch(
    `${BWICK_LCD_URL}/cosmos/bank/v1beta1/balances/${params.address}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message ?? "Failed to fetch balances." },
      { status: response.status },
    );
  }

  const balances = Array.isArray(data.balances) ? data.balances : [];
  const bwickBalance = balances.find(
    (balance: { denom: string; amount: string }) =>
      balance.denom === BWICK_DENOM,
  ) ?? { denom: BWICK_DENOM, amount: "0" };

  return NextResponse.json({
    balances,
    bwickBalance: {
      amount: bwickBalance.amount,
      display: formatBwickBalanceLabel(bwickBalance.amount),
    },
  });
}
