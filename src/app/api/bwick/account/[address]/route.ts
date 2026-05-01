import { NextResponse } from "next/server";
import { z } from "zod";
import { BWICK_LCD_URL } from "@/lib/bwick/chain";

const paramsSchema = z.object({
  address: z.string().min(1),
});

export async function GET(
  _request: Request,
  context: { params: Promise<{ address: string }> },
) {
  const params = paramsSchema.parse(await context.params);
  const response = await fetch(
    `${BWICK_LCD_URL}/cosmos/auth/v1beta1/accounts/${params.address}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return NextResponse.json({
      accountNumber: 0,
      sequence: 0,
      exists: false,
    });
  }

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message ?? "Failed to fetch account." },
      { status: response.status },
    );
  }

  return NextResponse.json({
    accountNumber: Number(data.account?.account_number ?? 0),
    sequence: Number(data.account?.sequence ?? 0),
    exists: true,
  });
}
