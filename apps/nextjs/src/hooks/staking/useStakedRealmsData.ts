import type { UsersRealmsQuery } from "@/.graphclient";
import { useQuery } from "@tanstack/react-query";

export const useStakedRealmsData = (address?: string) => {
  return useQuery({
    queryKey: ["UsersRealms" + address],
    queryFn: async () =>
      await fetch(`/api/subgraph/getRealms?address=${address}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          return res.data as UsersRealmsQuery;
        }),
    enabled: !!address,
    //refetchInterval: 10000,
  });
};
