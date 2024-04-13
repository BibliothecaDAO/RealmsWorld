import Image from "next/image";
import Link from "next/link";

import type { Studios, studios } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

import { BaseCard } from "../_components/BaseCard";

export const StudioCard = async ({
  studio,
}: {
  studio: (typeof studios)[Studios];
}) => {
  if (!studio) {
    return <div>Studio Not Found</div>;
  }

  return (
    <BaseCard>
      <Link
        className="group relative flex h-80 flex-col items-center justify-center  text-center"
        href={`/studios/${studio.id}`} // navigate to a custom studio homepage if one is specified, default page otherwise
      >
        <div className="relative flex h-full max-w-full flex-col items-center justify-center  object-contain">
          <h3 className="">{studio.name}</h3>

          {studio.logoFormat && (
            <Image
              src={`/studios/${studio.id}/logo.${studio.logoFormat}`}
              alt={studio.name}
              width={180}
              height={180}
              className="max-h-[180px] w-auto max-w-[75%] object-contain"
            />
          )}
        </div>
        <div className="invisible z-10 opacity-0 duration-300 group-hover:visible group-hover:-translate-y-3 group-hover:opacity-100">
          <Button variant={"default"}>Explore</Button>
        </div>
      </Link>
    </BaseCard>
  );
};
