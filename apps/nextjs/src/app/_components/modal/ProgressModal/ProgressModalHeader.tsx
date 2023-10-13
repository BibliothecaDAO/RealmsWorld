import React from "react";

const ProgressModalHeader = ({ title }: { title?: string }) => {
  return (
    <div className="flex items-center mt-3">
      <div className="text-lg flex items-center">{title}</div>
    </div>
  );
};

export default ProgressModalHeader;
