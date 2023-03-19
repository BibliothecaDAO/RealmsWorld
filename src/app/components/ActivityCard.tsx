import { Activity } from "@/types";
import Image from "next/image";

interface ActivityCardProps {
    activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <div
      className="flex justify-between w-full p-2 border border-white/30"
    >
      <div className="flex">
        <h6>
          {activity.token.tokenName
            ? activity.token.tokenName
            : "Collection Offer"}
        </h6>
        <div className="self-center px-4">
          {activity.type} {activity.price}
        </div>
      </div>
      <div className="flex">
        <Image
          src={activity.order ? activity.order.source.icon : ''} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={40} // Set the original width of the image
          height={40} // Set the original height of the image'fill')
          className="p-2 mx-auto border rounded border-white/20"
        />
      </div>
    </div>
  );
};
