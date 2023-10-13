"use client";

import { Button } from "@/app/_components/ui/button";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { useModal } from "connectkit";

export const BuyButton = ({ address, id, size = "sm" }: any) => {
  const { setOpen } = useModal();
  return (
    <BuyModal
      trigger={
        <Button size={size} variant={"default"}>
          Buy
        </Button>
      }
      collectionId={address}
      tokenId={id}
      onPurchaseComplete={(data) => console.log("Purchase Complete")}
      onPurchaseError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onConnectWallet={() => setOpen}
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
};
