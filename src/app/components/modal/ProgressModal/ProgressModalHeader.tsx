import React from "react";

//import {Loading, LoadingType, LoadingSize} from '../../../Loading/Loading';

const ProgressModalHeader = ({ title }: { title?: string }) => {
  return (
    <div className="flex items-center mt-3">
      {/*<Loading size={LoadingSize.SMALL} type={LoadingType.CIRCULAR} />*/}
      <div className="text-lg flex items-center">{title}</div>
    </div>
  );
};

export default ProgressModalHeader;
