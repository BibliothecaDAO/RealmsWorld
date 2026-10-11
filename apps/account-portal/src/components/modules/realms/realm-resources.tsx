import type { TokenMetadataAttribute } from "@/types/ark";
// Assuming you're using a tooltip library
import { Button } from "@/components/ui/button";
import { ResourceIcon } from "@/components/ui/resource-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

/** Max visible resource icons on desktop */
const VISIBLE_RESOURCES_DESKTOP = 4;
/** Max visible resource icons on mobile */
const VISIBLE_RESOURCES_MOBILE = 2;

export default function RealmResources({
  traits,
}: {
  traits: TokenMetadataAttribute[];
}) {
  const resources = traits.filter((trait) => trait.trait_type === "Resource");
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? VISIBLE_RESOURCES_MOBILE : VISIBLE_RESOURCES_DESKTOP;
  const hiddenCount = resources.length - visibleCount;

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {resources.slice(0, visibleCount).map((resource, index) => (
        <div
          key={index}
          className="bg-secondary flex shrink-0 items-center rounded-md p-1.5"
        >
          {resource.value && (
            <ResourceIcon size="md" resource={resource.value.toString()} />
          )}
        </div>
      ))}
      {resources.length > visibleCount && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="realm-chip h-8 min-w-8 shrink-0 px-1.5"
                  aria-label={`${hiddenCount} more resources`}
                >
                  +{hiddenCount}
                </Button>
              </TooltipTrigger>

              <TooltipContent
                className="max-w-56 p-2"
                id="resource-tooltip"
                side="top"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {resources.slice(visibleCount).map((resource, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div>
                        <span className="text-xs">{resource.value}</span>
                        {resource.value && (
                          <ResourceIcon
                            size="md"
                            withTooltip={false}
                            resource={resource.value.toString()}
                          />
                        )}
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
