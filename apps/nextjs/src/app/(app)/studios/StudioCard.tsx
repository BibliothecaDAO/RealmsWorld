import Image from "next/image";
import Link from "next/link";
import { Button } from "@realms-world/ui";

import { BaseCard } from "../../_components/BaseCard";
import type { CollectionEntry } from "@/utils/keystatic";

export const StudioCard = ({
  studio,
  slug
}: {
  studio: CollectionEntry<'studios'>;
  slug: string;
}) => {

  return (
    <BaseCard>
      <Link
        className="group relative flex aspect-square flex-col items-center justify-center  text-center"
        href={`/studios/${slug}`}
      >
        {studio.logo && (
          <Image
            src={`/content/studios/${slug}/${studio.logo}`}
            alt={studio.title}
            width={400}
            height={400}
            className="absolute bottom-0 top-0 h-full w-full brightness-50 transition-all duration-300 group-hover:filter-none"
          />
        )}
        <div className="relative flex h-full max-w-full flex-col items-center justify-end object-contain">
          <h3 className="text-2xl">{studio.title}</h3>
        </div>
        <div className="invisible z-10 opacity-0 duration-300 group-hover:visible group-hover:-translate-y-3 group-hover:opacity-100">
          <Button variant={"default"}>Explore</Button>
        </div>
      </Link>
    </BaseCard>
  );
};
