import React from "react";
import { RocketIcon } from "lucide-react";

const TransactionSubmittedModalHeader = () => {
  return (
    <div className="text-center items-center mt-2">
      <RocketIcon className="w-10 h-10 mx-auto" />
      <div className="text-lg font-semibold flex">Transaction sent</div>
    </div>
  );
};

export default TransactionSubmittedModalHeader;
