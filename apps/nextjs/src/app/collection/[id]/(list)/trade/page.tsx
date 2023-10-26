import type { erc721Tokens } from "@/constants";

import { Trade } from "../Trade";

export default async function Page({ params }: { params: { id: string } }) {
  return <Trade contractId={params.id as keyof typeof erc721Tokens} />;
}
