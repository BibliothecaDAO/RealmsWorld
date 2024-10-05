import type { Metadata } from "next";
import LordsIcon from "@/icons/lords.svg";
import { VeLords } from "./VeLords";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div className="px-4 pt-4 md:px-6">
      <div className="w-full">
        <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
          <LordsIcon className="mx-auto mr-2 h-7 w-7 fill-bright-yellow" />
          veLords
        </span>
      </div>
      <VeLords />
    </div>
  );
}
