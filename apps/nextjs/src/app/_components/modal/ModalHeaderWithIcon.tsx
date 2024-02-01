import type { LucideIcon } from "lucide-react";
import React from "react";

const ModalHeaderWithIcon = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="mb-3 w-full">
      <Icon className="mx-auto h-12 w-12" />
      <div className="mt-5 w-full text-xl">{title}</div>
      {subtitle && <div className="mt-4 text-lg">{subtitle}</div>}
    </div>
  );
};

export default ModalHeaderWithIcon;
