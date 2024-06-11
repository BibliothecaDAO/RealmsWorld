import type { paths } from "@reservoir0x/reservoir-sdk";
import { useQuery } from "@tanstack/react-query";

export const useUserTokens = ({ address }: { address?: string }) => {
  const { data, /* error,*/ isLoading } = useQuery({
    queryKey: ["userTokens" + address],
    queryFn: async () =>
      await fetch(`/api/reservoir?address=${address}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res as paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"];
        }),
    enabled: !!address,
  });

  return { tokens: data, isLoading };
};
