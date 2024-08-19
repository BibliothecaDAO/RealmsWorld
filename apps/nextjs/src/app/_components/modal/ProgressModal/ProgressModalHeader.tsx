import React from "react";

const ProgressModalHeader = ({ title }: { title?: string }) => {
  return (
    <div className="mt-3 flex items-center">
      <div className="flex items-center text-lg">{title}</div>
    </div>
  );
};

export default ProgressModalHeader;
