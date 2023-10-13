import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/types";
import { shortenHex } from "@/utils/utils";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  // convert unix to time
  const date = new Date(activity.timestamp * 1000);

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

  const getLocalizedDate = () => {
    return date.toLocaleString();
  };

  return (
    <div className="flex w-full flex-wrap border-b border-white/30 p-2">
      <div className="flex w-full flex-wrap justify-start sm:w-5/12">
        <div className="mr-6 w-full flex-none self-center rounded px-4 py-1 font-semibold opacity-60 sm:w-32">
          {!activity.token.tokenName ? "collection offer" : activity.type}
        </div>
        <Image
          src={
            activity.token.tokenImage
              ? activity.token.tokenImage
              : activity.collection.collectionImage
          }
          alt="An example image"
          width={60}
          height={60}
          className="self-start rounded-lg"
        />
        {activity.token.tokenName && (
          <Link
            className="ml-3 flex-none self-center"
            href={`/collection/${activity.collection.collectionId}/${activity.token.tokenId}`}
          >
            <span className="font-semibold ">
              <span className="text-xs opacity-50">
                #{activity.token.tokenId}
              </span>{" "}
              <br />
              {activity.token.tokenName}
            </span>
          </Link>
        )}
      </div>
      <div className="w-1/2 sm:w-1/12">
        <span className="text-xs opacity-50">to:</span> <br />
        {activity.toAddress ? (
          <Link href={`/user/${activity.toAddress}`}>
            {activity.toAddress ? shortenHex(activity.toAddress) : ""}
          </Link>
        ) : (
          "-"
        )}
      </div>
      <div className="w-1/2 sm:w-1/12">
        <span className="text-xs opacity-50">from:</span> <br />
        {activity.fromAddress ? (
          <Link href={`/user/${activity.fromAddress}`}>
            {activity.fromAddress ? shortenHex(activity.fromAddress) : ""}
          </Link>
        ) : (
          "-"
        )}
      </div>
      <div className="flex w-1/2 self-center font-semibold sm:w-2/12 sm:justify-end">
        {activity.type != "transfer" &&
          (activity.price?.currency ? (
            <div className="self-center">
              {activity.price?.amount.native} {activity.price?.currency.symbol}
            </div>
          ) : (
            <div className="self-center">{activity.price || 0} ETH</div>
          ))}
      </div>
      <div className="mt-2 flex w-1/2 justify-end sm:mt-0 sm:w-3/12">
        <div className="flex space-x-4 self-center px-4">
          <span
            className="flex-none rounded bg-black/50 px-4 py-1"
            title={getLocalizedDate()}
          >
            {getElapsedTime()}
          </span>
        </div>
        <div className="self-center">
          {activity.order ? (
            <Image
              src={activity.order?.source ? activity.order.source.icon : ""}
              alt="An example image"
              width={40}
              height={40}
              className="mx-auto flex-none p-2"
            />
          ) : (
            <div className="min-h-[40px] min-w-[40px]"></div>
          )}
        </div>
      </div>
    </div>
  );
};
