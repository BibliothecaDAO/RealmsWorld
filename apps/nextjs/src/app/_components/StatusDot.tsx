export const StatusDot = (status: string | undefined) => {
  let color = "";
  switch (status) {
    case "beta":
    case "alpha":
    case "mainnet":
      color = "bg-green-500"; // Green for beta, alpha, and mainnet
      break;
    case "development":
      color = "bg-red-500"; // Red for development
      break;
    default:
      color = "bg-gray-500"; // Default color for unspecified statuses
  }
  return (
    <span
      className={`h-2 w-2 ${color} mr-2 inline-block animate-pulse rounded-full`}
    ></span>
  );
};
