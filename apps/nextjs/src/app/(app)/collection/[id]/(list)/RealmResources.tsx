import { ResourceIcon } from "@realms-world/ui/components/ui/resource-icon";
import { TokenMetadataAttribute } from "@/types/ark";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@realms-world/ui/components/ui/tooltip"; // Assuming you're using a tooltip library

export default function RealmResources({
  traits,
}: {
  traits: TokenMetadataAttribute[];
}) {
  const resources = traits.filter((trait) => trait.trait_type === "Resource");
  const [showMore, setShowMore] = useState(false);
  const hiddenCount = resources.length - 4;

  return (
    <div className="flex items-center gap-2">
      {resources.slice(0, 4).map((resource, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-lg bg-secondary p-2"
        >
          <ResourceIcon size="md" resource={resource.value} />
        </div>
      ))}
      {resources.length > 4 && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  //onClick={() => setShowMore(!showMore)}
                  className="text-sm underline"
                >
                  {`+(${hiddenCount})`}
                </button>
              </TooltipTrigger>

              <TooltipContent
                className="h-16 max-w-48 p-2"
                id="resource-tooltip"
                side="top"
              >
                <div className="flex items-center gap-2">
                  {resources.slice(4).map((resource, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div>
                        <span className="text-xs">{resource.value}</span>
                        <ResourceIcon
                          size="md"
                          withTooltip={false}
                          resource={resource.value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
}
