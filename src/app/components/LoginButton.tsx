"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useBalance,
} from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "./ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
import { ConnectKitButton } from "connectkit";

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const { data: ensAddress, isError } = useEnsName({
    address: address,
  });

  const {
    data: lords,
    isError: lordsError,
    isLoading: lordsLoading,
  } = useBalance({
    address: address,
    token: "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
  });

  const {
    data: eth,
    isError: ethError,
    isLoading: ethLoading,
  } = useBalance({
    address: address,
  });

  if (isConnected)
    return (
      <div className="flex self-center space-x-3">
        <Button>
          {eth?.symbol} {parseFloat(eth?.formatted || "").toFixed(3)}
        </Button>
        <Button>
          {lords?.symbol} {lords?.formatted}
        </Button>
        <Button href={`/user/${address}`}>
          {ensAddress ? ensAddress : shortenHex(address || "")}
        </Button>
        <Button
          className="self-center"
          variant={"default"}
          onClick={() => disconnect()}
        >
          <LogOut className="self-center w-3" />
        </Button>
      </div>
    );
  return (
    <div className="self-center">
      <ConnectKitButton.Custom>
        {({ show, isConnected, truncatedAddress, ensName }) => {
          return (
            <>
              <Button
                className="self-center"
                variant={"default"}
                onClick={show}
              >
                {isConnected ? (
                  ensName ?? truncatedAddress
                ) : (
                  <span className="uppercase">Connect Wallet</span>
                )}
              </Button>
            </>
          );
        }}
      </ConnectKitButton.Custom>{" "}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default Profile;
