import PropTypes from "prop-types";
import React from "react";

const ModalHeaderWithIcon = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: any;
}) => {
  return (
    <div className="w-full mb-3">
      <Icon className="h-12 w-12 mx-auto" />
      <div className="text-xl mt-5 w-full">{title}</div>
      {subtitle && <div className="mt-4 text-lg">{subtitle}</div>}
    </div>
  );
};

export default ModalHeaderWithIcon;
