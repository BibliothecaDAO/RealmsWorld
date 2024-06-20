"use client";

import type { SiwsTypedData } from "siws";
import { useEffect, useState } from "react";
import { useAccount, useSignTypedData } from "@starknet-react/core";
import { Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

//import { signIn } from "@realms-world/auth";
import { Button } from "@realms-world/ui";

import { StarknetLoginButton } from "../wallet/StarknetLoginButton";
//import { SessionProvider, useSession } from "next-auth/react";

import { createSiwsData } from "./createSiwsData";

export function SIWSLogin({ buttonText }: { buttonText?: string }) {
  const { address } = useAccount();
  const [signInData, setSignInData] = useState<SiwsTypedData>();
  const { data: session } = useSession();

  useEffect(() => {
    const createSignInData = async () => {
      if (address) {
        const loginString = "Login to Realms.World with your Starknet Wallet";
        const siwsData = await createSiwsData(loginString, address);
        setSignInData(siwsData);
        return siwsData;
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createSignInData();
  }, [address]);
  const { signTypedDataAsync, error, isPending } = useSignTypedData({
    params: signInData,
  });
  const handleLogin = async () => {
    try {
      const signature = await signTypedDataAsync(signInData);
      await signIn("credentials", {
        message: JSON.stringify(signInData),
        redirect: false,
        signature: signature,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!address) {
    return <StarknetLoginButton />;
  }
  return (
    <form
      action={async () => {
        await handleLogin();
      }}
    >
      {session?.user.name}
      {error && <div>{error.message}</div>}
      <Button disabled={isPending}>
        {isPending ? (
          <>
            <Loader className="mr-2 animate-spin" /> Signing...
          </>
        ) : (
          buttonText ?? "Sign in with Starknet"
        )}
      </Button>
    </form>
  );
}
