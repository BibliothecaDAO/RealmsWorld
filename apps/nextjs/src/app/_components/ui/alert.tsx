import React from "react";
import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XOctagon,
} from "lucide-react";
import PropTypes from "prop-types";

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
const alertVariants = cva("flex rounded border text-lg p-4", {
  variants: {
    variant: {
      success: "border-cyan-400 bg-emerald-300",
      warning: "border-yellow-500 bg-amber-100 !text-yellow-600",
      info: "border-slate-600 bg-slate-400",
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
        return <AlertTriangleIcon />;
      case AlertType.ERROR:
      case AlertType.INFO:
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div className={cn("flex rounded p-4", alertVariants({ variant, align }))}>
      <div className={cn("flex w-full" /*, styles[align]*/)}>
        <div className="mr-2 flex h-5 w-5 justify-around">{renderIcon()}</div>
        <div className="flex flex-col text-left ">
          {title && (
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className="font-medium"
            ></div>
          )}
          {message && (
            <div
              dangerouslySetInnerHTML={{ __html: message }}
              className="mt-2 text-sm font-normal"
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
