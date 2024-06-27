"use client";

import { useMemo } from "react";
import { SIWSLogin } from "@/app/_components/auth/SIWSLogin";
import { api } from "@/trpc/react";
import { useAccount } from "@starknet-react/core";
import { useSession } from "next-auth/react";

import { CardContent, CardHeader } from "@realms-world/ui";
import { padAddress } from "@realms-world/utils";

export const SignInSIWS = () => {
  const { data: session } = useSession();
  const { address } = useAccount();
  const { data: delegate } = api.delegates.byId.useQuery(
    {
      id: address ?? "0x",
    },
    {
      refetchInterval: 60000,
      enabled: !!address,
    },
  );
  const requiresSignature = useMemo(() => {
    return !session?.user.name || padAddress(session.user.name) != delegate?.id;
  }, [session?.user.name, delegate?.id]);
  return (
    <>
      {requiresSignature ? (
        <>
          <CardHeader>Sign In to Edit Profile</CardHeader>
          <CardContent>
            <SIWSLogin />
          </CardContent>
        </>
      ) : (
        <CardHeader>Signed In</CardHeader>
      )}
    </>
  );
};
