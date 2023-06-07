import React from "react";
import { RocketIcon } from "lucide-react";

const TransactionSubmittedModalHeader = () => {
  return (
    <div className="text-center mt-2">
      <RocketIcon className="w-10 h-10" />
      <div className="text-lg flex align-center">Transaction sent</div>
    </div>
  );
};

export default TransactionSubmittedModalHeader;
