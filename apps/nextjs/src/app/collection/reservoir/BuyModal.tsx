"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

import { Button } from "@realms-world/ui";

export const BuyButton = ({ address, id, size = "sm" }: any) => {
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
      collectionId={address}
      tokenId={id}
      onPurchaseComplete={(data) => console.log("Purchase Complete")}
      onPurchaseError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onConnectWallet={() => openConnectModal}
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
};
