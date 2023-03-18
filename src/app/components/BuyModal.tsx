"use client"

import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

export const BuyButton = ({address, id}: any) => {
    return (
        <BuyModal
        trigger={<button>Buy</button>}
        collectionId={address}
        tokenId={id}
        onPurchaseComplete={(data) => console.log("Purchase Complete")}
        onPurchaseError={(error, data) =>
          console.log("Transaction Error", error, data)
        }
        onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
      />
    );
}