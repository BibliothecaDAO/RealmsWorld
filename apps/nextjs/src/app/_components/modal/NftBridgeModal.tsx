"use client";

import { StakingMigration } from "@/app/account/lords/Migration";
import { useUIStore } from "@/providers/UIStoreProvider";

import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  ScrollArea,
} from "@realms-world/ui";

export const NftBridgeModal = () => {
  const { isNftBridgeOpen, toggleNftBridge } = useUIStore((state) => state);
  if (isNftBridgeOpen) {
    return (
      <Dialog open onOpenChange={toggleNftBridge}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Bridge Realms</DialogTitle>
          <ScrollArea className="-mr-6 max-h-[600px] pr-6">
            <p>X Realms</p>
            <p>From:</p>
            <p> To:</p>
            <p>Receiving Address:</p>

            <p>Approval Status</p>
            <Button>Bridge</Button>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};
