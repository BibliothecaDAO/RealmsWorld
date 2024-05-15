"use client";

import { StakingMigration } from "@/app/account/lords/Migration";
import { useUIStore } from "@/providers/UIStoreProvider";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  ScrollArea,
} from "@realms-world/ui";

export const StakingMigrationModal = () => {
  const { isStakingMigrationOpen, toggleStakingMigration } = useUIStore(
    (state) => state,
  );
  if (isStakingMigrationOpen) {
    return (
      <Dialog open onOpenChange={toggleStakingMigration}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Migrate Realms</DialogTitle>
          <ScrollArea className="-mr-6 max-h-[600px] pr-6">
            <StakingMigration />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};
