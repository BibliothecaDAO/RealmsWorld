"use client";

import type { VariantProps } from "class-variance-authority";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

import type { buttonVariants } from "@realms-world/ui";
import { Button } from "@realms-world/ui";

export const BuyButton = ({
  address,
  id,
  size = "sm",
}: {
  address: string;
  id: string;
  size: VariantProps<typeof buttonVariants>["size"];
}) => {
  const { openConnectModal } = useConnectModal();
  return (
    <BuyModal
      trigger={
        <Button
          className="w-full text-dark-green"
          size={size}
          variant={"default"}
        >
          Buy
        </Button>
      }
      token={address + ":" + id}
      onPurchaseComplete={() => console.log("Purchase Complete")}
      onPurchaseError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onConnectWallet={() => openConnectModal}
      onClose={() => console.log("Modal Closed")}
    />
  );
};
