"use client";

import { StakingMigration } from "@/app/account/staking/Migration";
import { useUIStore } from "@/providers/UIStoreProvider";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@realms-world/ui";

export const StakingMigrationModal = () => {
  const { isStakingMigrationOpen, toggleStakingMigration } = useUIStore(
    (state) => state,
  );
  if (isStakingMigrationOpen) {
    return (
      <Dialog open onOpenChange={toggleStakingMigration}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogTitle>Migrate Realms</DialogTitle>
            <StakingMigration />
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};
