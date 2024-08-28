import Image from "next/image";
import Link from "next/link";
import LordsIcon from "@/icons/lords.svg";
import { shortenHex } from "@/utils/utils";
import { ArrowRightLeft, Ban, Gavel, NotebookPen } from "lucide-react";

import { getCollectionFromId } from "@realms-world/constants/src/Marketplace";
import type { CollectionActivity } from "@/types/ark";
import { useMemo } from "react";

interface ActivityCardProps {
  activity: CollectionActivity;
  collectionId: string;
}

export const L2ActivityCard = ({ activity, collectionId }: ActivityCardProps) => {
  // convert unix to date
  // *1000 is to convert starknet timestamp to milliseconds
  const date = useMemo(() => activity.time_stamp ? new Date(activity.time_stamp * 1000) : null, [activity.time_stamp]);
  const elapsedTime = useMemo(() => {
    if (date) {
      const timeDiff = Math.abs(Date.now() - date.getTime());

      // get time difference in various units
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 28);
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

  }, [date]);
  const localizedDate = useMemo(() => date ? date.toLocaleString() : null, [date]);


  return (
    <div className="flex w-full flex-wrap border-b p-2 ">
      <div className="mr-6 w-full flex-none self-center rounded px-4 py-1 font-semibold sm:w-1/12">
        {activity.activity_type === "SALE" && <Gavel />}
        {activity.activity_type === "LISTING" && <NotebookPen />}
        {activity.activity_type === "CANCELLED" && <Ban />}
        {activity.activity_type === "UNKNOWN" && <ArrowRightLeft />}

        {activity.activity_type}
      </div>
      <div className="flex w-full flex-wrap justify-start sm:w-3/12">
        {activity.token_metadata.image && (
          <Image
            src={
              activity.token_metadata.image
              /*? activity.token.image
              : activity.collection.collectionImage*/
            }
            alt="An example image"
            width={60}
            height={60}
            className="self-start rounded-lg"
          />
        )}
        {activity.token_id && (
          <Link
            className="ml-3 flex-none self-center"
            href={`/collection/${getCollectionFromId(collectionId)}/${activity.token_id}`}
          >
            <span className="font-semibold ">
              <span className="text-xs opacity-50">
                #{activity.token_id}
              </span>{" "}
              <br />
              {decodeURIComponent(activity.token_metadata.name ?? "")}
            </span>
          </Link>
        )}
      </div>
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
        {activity.from ? (
          <Link href={`/user/${activity.from}`}>
            {activity.from ? shortenHex(activity.from) : ""}
          </Link>
        ) : (
          "-"
        )}
      </div>
      <div className="w-1/2 sm:w-2/12">
        {activity.to && (
          <>
            <span className="text-xs opacity-50">to:</span> <br />
            {activity.to ? (
              <Link href={`/user/${activity.to}`}>
                {activity.to ? shortenHex(activity.to) : ""}
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
            title={localizedDate}
          >
            {elapsedTime}
          </span>
        </div>
      </div>
    </div>
  );
};
