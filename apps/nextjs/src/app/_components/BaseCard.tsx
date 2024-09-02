export const BaseCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} border rounded  shadow-sm shadow-black transition-all duration-200 hover:border-bright-yellow`}
    >
      {children}
    </div>
  );
};
