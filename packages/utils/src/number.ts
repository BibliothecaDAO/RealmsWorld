export function formatNumber(
  amount: number | null | undefined,
  maximumFractionDigits: number = 2,
) {
  const { format } = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maximumFractionDigits,
  });
  if (amount === null || amount === undefined) {
    return "-";
  }
  return format(amount);
}
