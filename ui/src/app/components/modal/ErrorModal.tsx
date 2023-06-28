import PropTypes from "prop-types";
import React from "react";

const ErrorModal = ({ text }: { text: string }) => {
  return <div className="mb-3 overflow-y-auto max-h-[300px]">{text}</div>;
};

ErrorModal.propTypes = {
  text: PropTypes.string,
};

export default ErrorModal;
