import Link from "next/link";
import { useTimeDiff } from "@/hooks/useTimeDiff";
import LordsIcon from "@/icons/lords.svg";
import { shortenHex } from "@/utils/utils";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";

interface ActivityCardProps {
  activity: RouterOutputs["erc721MarketEvents"]["all"]["items"][number];
  token?: RouterOutputs["erc721Tokens"]["byId"];
}

export const ListingCard = ({ activity, token }: ActivityCardProps) => {
  // convert unix to time

  const expiryDiff = useTimeDiff(activity.expiration ?? Date.now());
  const getLocalizedDate = () => {
    return expiryDiff.toLocaleString();
  };

  return (
    <div className=" flex w-full flex-wrap border-b p-2">
      <div className="flex w-1/2 self-center font-semibold sm:w-2/12 ">
        <div className="flex items-center self-center">
          {activity.price ?? 0}
          <LordsIcon className="ml-2 h-5 w-5 fill-current" />
        </div>
      </div>
      <div className="w-1/2 sm:w-1/12">
        <span className="text-xs opacity-50">from:</span> <br />
        {activity.created_by ? (
          <Link href={`/user/${activity.created_by}`}>
            {activity.created_by ? shortenHex(activity.created_by) : ""}
          </Link>
        ) : (
          "-"
        )}
      </div>

      <div className="mt-2 flex w-1/2 justify-end sm:mt-0 sm:w-3/12">
        <div className="flex space-x-4 self-center px-4">
          <span
            className="flex-none rounded bg-black/50 px-4 py-1"
            title={getLocalizedDate()}
          >
            {expiryDiff}
          </span>
        </div>
      </div>
      <div className="mt-2 flex w-1/2 justify-end sm:mt-0 sm:flex-grow">
        {token && (
          <BuyModal
            trigger={
              <Button variant={"outline"} size={"lg"}>
                Buy Now
              </Button>
            }
            // tokenId={tokenId}
            token={token}
            //collectionId={activity.collection_id}
            orderId={0}
          />
        )}
      </div>
    </div>
  );
};
