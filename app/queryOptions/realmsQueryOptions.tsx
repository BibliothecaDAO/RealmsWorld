import { queryOptions } from "@tanstack/react-query";
import { getPortfolioTokens } from "@/lib/ark/getPortfolioTokens";
import { ArkClient } from "@/lib/ark/client";

export const realmsQueryOptions = ({
  walletAddress,
  client,
}: {
  walletAddress: string;
  client: ArkClient;
}) =>
  queryOptions({
    queryKey: ["realms" + walletAddress],
    queryFn: () => getPortfolioTokens({walletAddress, client}),
  });
