"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "./ui/button";

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div className="self-center">
        Connected to
        <Link href={`/user/${address}`}>[0xAccount]</Link>
        <button onClick={() => disconnect()}>Disconnect</button>
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
