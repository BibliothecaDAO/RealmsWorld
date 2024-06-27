"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { api } from "@/trpc/react";
import { useAccount } from "@starknet-react/core";
import { Search, TriangleAlert, UserRoundPlus } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
} from "@realms-world/ui";
import { padAddress } from "@realms-world/utils";

export const DelegatesActions = () => {
  const { address } = useAccount();
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: address,
  });
  const { data: tokenHolder } = api.delegates.tokenHolderById.useQuery(
    {
      id: address ?? "0x",
    },
    {
      refetchInterval: 60000,
      enabled: !!address,
    },
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const router = useRouter();
  const [searchAddress, setSearchAddress] = useState("");
  return (
    <>
      {!tokenHolder?.delegate &&
        parseInt(tokenHolder?.tokenBalanceRaw ?? "0") > 0 && (
          <Alert variant={"warning"} className="mt-4">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle className="text-lg">
              Your Realms are not earning Lords
            </AlertTitle>
            <AlertDescription>
              Selected a delegate below or create your own delegate profile to
              start earning
            </AlertDescription>
          </Alert>
        )}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="relative sm:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
          <form
            className="space-y-8"
            onSubmit={(e) => {
              console.log("submit");
              e.preventDefault();
              router.push(
                pathname + "?" + createQueryString("search", searchAddress),
              );
            }}
          >
            <Input
              value={searchAddress}
              onChange={(event) => setSearchAddress(event.target.value)}
              placeholder="Search address"
              className="pl-8"
            />
          </form>
        </div>
        <div>
          {tokenHolder?.delegate != padAddress(address) && (
            <Button size="sm" onClick={() => delegateRealms()}>
              <UserRoundPlus className="mr-2" /> Delegate to Self
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
