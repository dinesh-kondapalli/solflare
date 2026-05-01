import { fromBase64 } from "@cosmjs/encoding";
import { StargateClient } from "@cosmjs/stargate";
import { NextResponse } from "next/server";
import { z } from "zod";
import { BWICK_RPC_URL } from "@/lib/bwick/chain";

const sendSchema = z.object({
  txBase64: z.string().min(1),
});

export async function POST(request: Request) {
  const body = sendSchema.parse(await request.json());
  const client = await StargateClient.connect(BWICK_RPC_URL);

  try {
    const result = await client.broadcastTx(fromBase64(body.txBase64));

    if (result.code !== 0) {
      return NextResponse.json(
        {
          error: result.rawLog || "Transaction failed on-chain.",
          code: result.code,
          transactionHash: result.transactionHash,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      code: result.code,
      transactionHash: result.transactionHash,
      rawLog: result.rawLog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to broadcast transaction.",
      },
      { status: 400 },
    );
  } finally {
    client.disconnect();
  }
}
