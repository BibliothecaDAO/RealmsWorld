"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { ListModal } from "@reservoir0x/reservoir-kit-ui";

export const ListingModal = ({ address, id }: any) => {
  const [openState, setOpenState] = useState(false);

  return (
    <ListModal
      trigger={<Button variant={"default"}>List</Button>}
      collectionId={address}
      tokenId={id}
      currencies={[
        {
          contract: "0x0000000000000000000000000000000000000000",
          symbol: "ETH",
        },
        {
          contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          decimals: 6,
        },
      ]}
      openState={[openState, setOpenState]}
      nativeOnly={false}
      oracleEnabled={false}
      onGoToToken={() => console.log("Awesome!")}
      onListingComplete={(data) => {
        console.log("Listing Complete", data);
      }}
      onListingError={(error, data) => {
        console.log("Transaction Error", error, data);
      }}
      onClose={(data, stepData, currentStep) => {
        console.log("ListModal Closed");
      }}
    />
  );
};
