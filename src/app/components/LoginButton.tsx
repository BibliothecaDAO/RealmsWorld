"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
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
      <button onClick={() => connect()}>Connect Wallet</button>
    </div>
  );
}

export default Profile;
