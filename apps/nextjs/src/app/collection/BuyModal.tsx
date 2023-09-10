"use client";

import { Button } from "@/app/_components/ui/button";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

export const BuyButton = ({ address, id, size = "sm" }: any) => {
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
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
};
