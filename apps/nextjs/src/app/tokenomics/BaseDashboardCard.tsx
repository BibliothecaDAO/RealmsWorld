"use client";

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
    <div className={`h-full border bg-theme-gray-light p-4 ${className}`}>
      <h6>{title}</h6>
      <h5>{subtitle}</h5>
      <h3>{dataTitle}</h3>
      {children}
    </div>
  );
};
