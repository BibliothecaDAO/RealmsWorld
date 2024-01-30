import type { Activity } from "@/types";
import Image from "next/image";
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
  const date = new Date(activity.updated_at);

  function getElapsedTime() {
    // get time difference from now
    const timeDiff = Math.abs(Date.now() - date.getTime());

    // get time difference in various units
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // return the most appropriate unit
    if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
  const expiryDiff = useTimeDiff(activity.expiration);
  const getLocalizedDate = () => {
    return date.toLocaleString();
  };

  return (
    <div className=" flex w-full flex-wrap border-b p-2">
      <div className="flex w-1/2 self-center font-semibold sm:w-2/12 ">
        <div className="flex items-center self-center">
          {activity.price || 0}
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
