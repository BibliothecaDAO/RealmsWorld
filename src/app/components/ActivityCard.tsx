import { Activity } from "@/types";
import Image from "next/image";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  // convert unix to time
  const date = new Date(activity.timestamp * 1000);

  // get time difference from now
  const timeDiff = Math.abs(Date.now() - date.getTime());

  // get time difference in hours
  const hours = Math.floor(timeDiff / 1000 / 60 / 60);
  return (
    <div className="flex justify-between w-full p-2 border border-white/30 bg-black/5">
      <div className="flex w-full">
        <span className="self-center px-4 py-1 mr-6 rounded bg-black/50">
          {activity.type}
        </span>
        <h6 className="flex-none">
          {activity.token.tokenName ? (
            <span>
              #{activity.token.tokenId} {activity.token.tokenName}
            </span>
          ) : (
            "Collection Offer"
          )}
        </h6>
        <div className="flex self-center justify-end w-full px-4 space-x-4">
          <div className="self-center">{activity.price} </div>

          <span className="px-4 py-1 rounded bg-black/50">
            {date.toLocaleString()} {hours} hours ago
          </span>
        </div>
      </div>
      <div className="flex">
        <Image
          src={activity.order ? activity.order.source.icon : ""} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={40} // Set the original width of the image
          height={40} // Set the original height of the image'fill')
          className="p-2 mx-auto border rounded border-white/20"
        />
      </div>
    </div>
  );
};
