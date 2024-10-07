"use client";

import type { VariantProps } from "class-variance-authority";
import React from "react";
//import StarknetLogo from "@/components/icons/starknet.svg";
//import { useUIStore } from "@/providers/UIStoreProvider";
//import { shortentHex } from "@/utils/utils";
import { Connector, useAccount, useConnect } from "@starknet-react/core";

import type { buttonVariants } from "@realms-world/ui/components/ui/button";
import { Button } from "@realms-world/ui/components/ui/button";
import { Loader } from "lucide-react";
import { shortenAddress } from "@/utils/helpers";
import {
    type StarknetkitConnector,
    useStarknetkitConnectModal,
} from "starknetkit";
import { availableConnectors } from "./available-connectors";

export const StarknetLoginButton = ({
    openAccount = false,
    variant,
    textClass,
    buttonClass,
    children,
}: {
    openAccount?: boolean;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    textClass?: string;
    buttonClass?: string;
    children?: React.ReactNode;
}) => {
    const { account, isConnected, isConnecting } = useAccount();
    const { connectAsync, connectors } = useConnect();
    const { starknetkitConnectModal } = useStarknetkitConnectModal({
        connectors: availableConnectors as StarknetkitConnector[],
    });

    async function connectWalletWithModal() {
        const { connector } = await starknetkitConnectModal();
        if (!connector) {
            return;
        }
        await connectAsync({ connector: connector as Connector });
    }

    return (
        <Button
            className={buttonClass}
            variant={variant ?? "outline"}
            size="sm"
            onClick={connectWalletWithModal}
            disabled={isConnecting}
        >
            <span className="flex items-center font-sans text-lg normal-case">
                <img src="/icons/starknet.svg" className="h-6 w-6" />
                <span className={`pl-2 ${textClass ?? "sm:block"}`}>
                    {isConnecting && <Loader className="animate-spin" />}
                    {account?.address ? (
                        <>{shortenAddress(account.address)}</>
                    ) : (<>
                        {children ?? "Connect Starknet"}</>)
                    }
                </span>
            </span>
        </Button>
    );
};
