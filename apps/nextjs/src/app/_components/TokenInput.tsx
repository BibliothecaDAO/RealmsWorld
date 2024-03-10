import { Input } from "@realms-world/ui";
import React from "react";

export const TokenInput = ({
  onChange,
  amount,
}: {
  onChange?: () => void;
  amount: number | string;
  icon: React.ReactElement
}) => {
  return (
    <div className="relative w-full">
      <Input
        min={0}
        max={1000}
        value={amount}
        placeholder="0.00"
        className="h-14 p-4 text-lg leading-6 placeholder:text-white/30 hover:bg-black/30"
        onChange={onChange}
      />
      <div className="absolute right-0 top-0 flex pr-4 pt-4">
        <LordsIcon className="mr-3 h-6 w-6 fill-white" />
      </div>
    </div>
  );
};
