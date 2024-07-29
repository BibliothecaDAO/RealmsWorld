import type { Metadata } from "next";
import { StudioCard } from "@/app/(app)/studios/StudioCard";

import { reader } from "@/utils/keystatic";

import { PageLayout } from "@/app/_components/PageLayout";

export const metadata: Metadata = {
  title: "Games of the Realms",
  description:
    "Game Studios contributing to the Realms.World- Created for adventurers by BiblioDAO",
  openGraph: {
    title: "Games of the Realms",
    description:
      "Game Studios contributing to the Realms.World- Created for adventurers by BiblioDAO",
  },
};

export default async function Page() {
  const studios = await reader.collections.studios.all();
  return (
    <PageLayout title="Game Studios">
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {studios.map((studio, index) => (
          <StudioCard key={index} studio={studio.entry} slug={studio.slug} />
        ))}
      </div>
    </PageLayout>
  );
}
