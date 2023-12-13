"use client";

import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { useModal } from "connectkit";

import { Button } from "@realms-world/ui";

export const BuyButton = ({ address, id, size = "sm" }: any) => {
  const { setOpen } = useModal();
  return (
    <BuyModal
      trigger={
        <Button
          className="text-dark-green w-full"
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
      onConnectWallet={() => setOpen(true)}
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
};
