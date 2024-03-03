import Image from "next/image";
import Link from "next/link";
import LordsIcon from "@/icons/lords.svg";
import { shortenHex } from "@/utils/utils";
import { ArrowRightLeft, Ban, Gavel, NotebookPen } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { getCollectionFromId } from "@realms-world/constants/src/Marketplace";

interface ActivityCardProps {
  activity: RouterOutputs["erc721MarketEvents"]["all"]["items"][number] & {
    token?: RouterOutputs["erc721Tokens"]["byId"];
  };
}

export const L2ActivityCard = ({ activity }: ActivityCardProps) => {
  // convert unix to time
  const date =
    "updated_at" in activity && activity.updated_at
      ? new Date(activity.updated_at)
      : null;

  function getElapsedTime() {
    // get time difference from now
    if (date) {
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
      if (seconds < 60)
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
      if (minutes < 60)
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
      if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
      if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
      return `${years} year${years === 1 ? "" : "s"} ago`;
    }
  }
  const getLocalizedDate = () => {
    return date?.toLocaleString();
  };

  let eventType;

  switch (activity.status) {
    case "filled":
      eventType = "Sale";
      break;
    case "open":
      eventType = "Listing";
      break;
    case "cancelled":
      eventType = "Cancelled Listing";
      break;
    default:
      eventType = "Unknown";
      break;
  }
  return (
    <div className=" flex w-full flex-wrap border-b p-2">
      <div className="mr-6 w-full flex-none self-center rounded px-4 py-1 font-semibold sm:w-1/12">
        {eventType === "Sale" && <Gavel />}
        {eventType === "Listing" && <NotebookPen />}
        {eventType === "Cancelled Listing" && <Ban />}
        {eventType === "Unknown" && <ArrowRightLeft />}

        {eventType}
      </div>
      {activity.token && (
        <div className="flex w-full flex-wrap justify-start sm:w-3/12">
          {activity.token.image && (
            <Image
              src={
                activity.token.image
                /*? activity.token.image
                : activity.collection.collectionImage*/
              }
              alt="An example image"
              width={60}
              height={60}
              className="self-start rounded-lg"
            />
          )}
          {activity.token.token_id && activity.collection_id && (
            <Link
              className="ml-3 flex-none self-center"
              href={`/collection/${getCollectionFromId(activity.collection_id)}/${activity.token.token_id}`}
            >
              <span className="font-semibold ">
                <span className="text-xs opacity-50">
                  #{activity.token.token_id}
                </span>{" "}
                <br />
                {decodeURIComponent(activity.token.name ?? "")}
              </span>
            </Link>
          )}
        </div>
      )}
      {/*activity.toAddress && (
        <div className="w-1/2 sm:w-1/12">
          <span className="text-xs opacity-50">to:</span> <br />
          <Link href={`/user/${activity.toAddress}`}>
            {activity.toAddress ? shortenHex(activity.toAddress) : ""}
          </Link>
        </div>
      )*/}
      <div className="w-1/2 sm:w-2/12">
        <span className="text-xs opacity-50">from:</span> <br />
        {activity.created_by ? (
          <Link href={`/user/${activity.created_by}`}>
            {activity.created_by ? shortenHex(activity.created_by) : ""}
          </Link>
        ) : (
          "-"
        )}
      </div>
      <div className="w-1/2 sm:w-2/12">
        {activity.purchaser && (
          <>
            <span className="text-xs opacity-50">to:</span> <br />
            {activity.created_by ? (
              <Link href={`/user/${activity.purchaser}`}>
                {activity.purchaser ? shortenHex(activity.purchaser) : ""}
              </Link>
            ) : (
              "-"
            )}
          </>
        )}
      </div>

      <div className="flex w-1/2 self-center font-semibold sm:w-2/12">
        {/*activity.type != "transfer" &&
          (activity.price?.currency ? (
            <div className="self-center">
              {activity.price?.amount.native} {activity.price?.currency.symbol}
            </div>
          ) : (*/}
        <div className="flex items-center self-center">
          {activity.price ?? 0}
          <LordsIcon className="ml-2 h-5 w-5 fill-current" />
        </div>
      </div>
      <div className="mt-2 flex w-1/2 justify-end sm:mt-0 sm:w-1/12">
        <div className="flex space-x-4 self-center px-4">
          <span
            className="flex-none rounded bg-black/50 px-4 py-1"
            title={getLocalizedDate()}
          >
            {getElapsedTime()}
          </span>
        </div>
      </div>
    </div>
  );
};
