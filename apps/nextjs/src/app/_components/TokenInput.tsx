import React from "react";
import LordsIcon from "@/icons/lords.svg";

import { Input } from "@realms-world/ui";

export interface TokenInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  amount?: number | string;
  icon?: React.ReactElement;
}

export const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
  (props, ref) => {
    const { amount, icon, ...rest } = props;
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          min={0}
          max={1000}
          value={amount}
          placeholder="0.00"
          className="h-14 p-4 text-lg leading-6 placeholder:text-white/30 hover:bg-black/30"
          {...rest}
        />
        <div className="absolute right-0 top-0 flex pr-4 pt-4">
          {icon ?? <LordsIcon className="mr-3 h-6 w-6 fill-white" />}
        </div>
      </div>
    );
  },
);
TokenInput.displayName = "TokenInput";
