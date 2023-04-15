import TokenInfo from "./UserTokenCard";
import { UserTokenData } from "@/types";

function UserTokenGrid({ tokens }: { tokens: UserTokenData[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {tokens.map((token, index) => (
        <TokenInfo key={index} token={token} />
      ))}
    </div>
  );
}

export default UserTokenGrid;