import ImportWalletPage from "@/components/wallet/ImportWalletPage";

export default async function OnboardImportPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const params = await searchParams;

  return <ImportWalletPage resetNotice={params.reset === "1"} />;
}
