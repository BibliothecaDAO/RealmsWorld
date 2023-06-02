import PropTypes from "prop-types";
import React from "react";

const ProgressModalBody = ({ message }) => {
  return <div className="flex flex-col align-center">{message}</div>;
};

ProgressModalBody.propTypes = {
  message: PropTypes.string,
};

export default ProgressModalBody;
