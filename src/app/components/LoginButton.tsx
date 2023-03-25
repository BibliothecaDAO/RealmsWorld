"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
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

  if (isConnected)
    return (
      <div className="flex self-center">
        <Button href={`/user/${address}`}>{shortenHex(address || "")}</Button>
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
      <div>
        <Dialog>
          <DialogTrigger>
            {" "}
            <Button variant={"default"}>Login</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                {connectors.map((connector) => (
                  <Button
                    variant={"default"}
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      " (connecting)"}
                  </Button>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}

export default Profile;
