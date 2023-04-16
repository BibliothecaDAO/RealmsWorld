"use client";

import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from "wagmi";
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

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const { data: EnsAddress, isError } = useEnsName({
    address: address,
  })

  const { data: lords, isError: lordsError, isLoading: lordsLoading } = useBalance({
    address: address,
    token: '0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0',
  })

  const { data: eth, isError: ethError, isLoading: ethLoading } = useBalance({
    address: address
  })

  if (isConnected)
    return (
      <div className="flex self-center space-x-3">
        <Button>
          {eth?.symbol}  {eth?.formatted}
        </Button>
        <Button>
          {lords?.symbol}  {lords?.formatted}
        </Button>
        <Button href={`/user/${address}`}>
          {EnsAddress ? EnsAddress : shortenHex(address || "")}

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

      <Dialog>
        <DialogTrigger>
          {" "}
          <Button variant={"default"}>Login</Button>
        </DialogTrigger>
        <DialogContent className="bg-black">
          <DialogHeader>
            <DialogDescription className="grid grid-cols-2 gap-4 p-4">
              {connectors.map((connector) => (
                <button
                  className="p-8 text-2xl border rounded border-white/20 hover:bg-slate-800"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {error && <div>{error.message}</div>}

    </div>
  );
}

export default Profile;
