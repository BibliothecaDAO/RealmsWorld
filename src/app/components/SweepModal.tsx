"use client";

import { SweepModal } from "@reservoir0x/reservoir-kit-ui";
import { Button } from "./ui/button";

export const SweepButton = ({ address, id, size = "sm" }: any) => {
  return (
    <SweepModal
      trigger={<Button>Sweep</Button>}
      collectionId={id}
      onSweepComplete={(data) => {
        console.log("Sweep Complete", data);
      }}
      onSweepError={(error, data) => {
        console.log("Sweep Error", error, data);
      }}
      onClose={() => {
        console.log("SweepModal Closed");
      }}
    />
  );
};
