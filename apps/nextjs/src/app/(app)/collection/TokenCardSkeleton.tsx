export function TokenCardSkeleton({
  pulse = true,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { pulse?: boolean }) {
  return (
    <div className="flex min-h-[300px] flex-row border-2 bg-background/90">
      {children}
    </div>
  );
}
