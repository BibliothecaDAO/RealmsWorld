import PropTypes from "prop-types";
import React from "react";

//import {Loading, LoadingType, LoadingSize} from '../../../Loading/Loading';

const ProgressModalHeader = ({ title }) => {
  return (
    <div className="flex align-center mt-3">
      {/*<Loading size={LoadingSize.SMALL} type={LoadingType.CIRCULAR} />*/}
      <div className="text-lg">{title}</div>
    </div>
  );
};

ProgressModalHeader.propTypes = {
  title: PropTypes.string,
};

export default ProgressModalHeader;
