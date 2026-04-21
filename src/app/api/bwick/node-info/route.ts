import { NextResponse } from "next/server";
import { BWICK_LCD_URL, BWICK_RELAYER_URL } from "@/lib/bwick/chain";

export async function GET() {
  const [lcdResponse, relayerResponse] = await Promise.all([
    fetch(`${BWICK_LCD_URL}/cosmos/base/tendermint/v1beta1/node_info`, {
      cache: "no-store",
    }),
    fetch(`${BWICK_RELAYER_URL}/health`, { cache: "no-store" }),
  ]);

  const lcd = await lcdResponse.json();
  const relayer = await relayerResponse.json();

  return NextResponse.json({ lcd, relayer });
}
