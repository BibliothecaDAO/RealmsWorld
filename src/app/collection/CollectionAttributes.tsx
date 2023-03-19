import Image from "next/image";
import { Attributes } from "../components/Attributes";

export const CollectionAttributes = ({ address, attributes, collection }: any) => {
  return (
    <div className="flex-none hidden w-64 pt-8 rounded-t-full shadow md:block bg-gradient-to-b from-theme-gray-light/50 shadow-white/20">
      <Image
        src={collection.image} // Use the path to your image
        alt="An example image" // Provide a descriptive alt text
        width={200} // Set the original width of the image
        height={200} // Set the original height of the image'fill')
        className="mx-auto border rounded-full"
      />
      <Attributes address={address} attributes={attributes} />
    </div>
  );
};
