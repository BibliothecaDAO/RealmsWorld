import { ResourceIcon } from "@realms-world/ui/components/ui/resource-icon";
import { Badge } from "@realms-world/ui/components/ui/badge";
import Image from "next/image";
import { TokenMetadataAttribute } from "@/types/ark";

export default function RealmResources({
  traits,
}: {
  traits: TokenMetadataAttribute[];
}) {
  const resources = traits.filter((trait) => trait.trait_type === "Resource");

  return (
    <div className="flex flex-wrap gap-4">
      {resources.map((resource, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-lg bg-secondary p-2"
        >
          <ResourceIcon size="md" resource={resource.value} />
        </div>
      ))}
    </div>
  );
}
