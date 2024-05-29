import { RESERVOIR_API_URL, SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useQuery } from "@tanstack/react-query";

import { CollectionAddresses } from "@realms-world/constants";

export const useUserActivity = (address?: string) => {
  return useQuery({
    queryKey: ["UserActivity" + address],
    queryFn: async () =>
      await fetch(
        `${RESERVOIR_API_URL}/users/activity/v6?users=${address}&collection=${CollectionAddresses.realms[SUPPORTED_L1_CHAIN_ID]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
        .then((res) => res.json())
        .then((res: { data: any }) => {
          return res.data;
        })
        .catch((err) => console.log("err", err)),
  });
};
