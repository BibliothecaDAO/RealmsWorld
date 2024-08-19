import React from "react";
import PropTypes from "prop-types";

const ErrorModal = ({ text }: { text: string }) => {
  return <div className="mb-3 max-h-[300px] overflow-y-auto">{text}</div>;
};

ErrorModal.propTypes = {
  text: PropTypes.string,
};

export default ErrorModal;
