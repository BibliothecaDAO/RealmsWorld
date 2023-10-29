import React from "react";
import type { FunctionComponent } from "react";
import ArgentIcon from "@/icons/argent.svg";
import BraavosIcon from "@/icons/braavos.svg";
import { Mail } from "lucide-react";

interface WalletIconsProps {
  id: string;
}

const WalletIcons: FunctionComponent<WalletIconsProps> = ({ id }) => {
  if (id === "argentX")
    return (
      <div className="mr-3">
        <ArgentIcon width="24px" color="white" />
      </div>
    );

  if (id === "braavos") return <BraavosIcon width="26px" className="mr-3" />;

  return <Mail className="mr-3 " />;
};

export default WalletIcons;
