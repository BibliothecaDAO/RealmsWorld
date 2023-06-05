import PropTypes from "prop-types";
import React from "react";

const ProgressModalBody = ({ message }: { message?: string }) => {
  return <div className="flex flex-col align-center">{message}</div>;
};
export default ProgressModalBody;
