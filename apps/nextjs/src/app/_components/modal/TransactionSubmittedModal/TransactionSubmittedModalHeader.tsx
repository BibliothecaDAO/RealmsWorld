import React from "react";
import { RocketIcon } from "lucide-react";

const TransactionSubmittedModalHeader = () => {
  return (
    <div className="mt-2 items-center text-center">
      <RocketIcon className="mx-auto h-10 w-10" />
      <div className="flex text-lg font-semibold">Transaction sent</div>
    </div>
  );
};

export default TransactionSubmittedModalHeader;
