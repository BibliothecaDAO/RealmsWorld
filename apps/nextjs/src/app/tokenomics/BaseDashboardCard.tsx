"use client";

import { BaseCard } from "../_components/BaseCard";

interface BaseDashboardCardProps {
  title: string;
  dataTitle?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const BaseDashboardCard = ({
  children,
  title,
  subtitle,
  dataTitle,
  className,
}: BaseDashboardCardProps) => {
  return (
    <BaseCard className={`${className} h-full p-4`}>
      <h6 className="font-sans font-bold tracking-wide">{title}</h6>
      <h5>{subtitle}</h5>
      <h3>{dataTitle}</h3>
      {children}
    </BaseCard>
  );
};
