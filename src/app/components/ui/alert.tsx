import PropTypes from "prop-types";
import React from "react";

import { XOctagon, CheckCircleIcon, InfoIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const AlertType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const AlertAlign = {
  LEFT: "alignLeft",
  CENTER: "alignCenter",
  RIGHT: "alignRight",
};
const alertVariants = cva("flex rounded text-lg p-4", {
  variants: {
    variant: {
      success: "",
      warning: "",
      info: "",
      error: "",
    },
    align: {
      left: "",
      center: "justify-center",
      right: "justify-flex-end",
    },
  },
});

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  message?: string;
}

export const Alert = ({
  title = "",
  message = "",
  variant = "info",
  align = "left",
}: AlertProps) => {
  const renderIcon = () => {
    switch (variant) {
      case AlertType.SUCCESS:
        return <CheckCircleIcon />;
      case AlertType.WARNING:
        return <XOctagon />;
      case AlertType.ERROR:
      case AlertType.INFO:
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div
      className={cn(
        "flex  rounded text-lg p-4",
        alertVariants({ variant, align })
      )}
    >
      <div className={cn("flex w-full" /*, styles[align]*/)}>
        <div className="mr-3 flex justify-around">{renderIcon()}</div>
        <div className="flex flex-col">
          {title && (
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className="font-medium"
            ></div>
          )}
          {message && (
            <div
              dangerouslySetInnerHTML={{ __html: message }}
              className="font-normal mt-2"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  align: PropTypes.string,
};
