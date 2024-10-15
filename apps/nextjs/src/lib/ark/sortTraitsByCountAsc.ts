import type { CollectionTraits } from "@/types/ark";

export function sortTraitsByCountAsc(traits: CollectionTraits) {
  return Object.keys(traits).reduce((sortedTraits, traitCategory) => {
    const attributes = traits[traitCategory];

    if (attributes) {
      const sortedAttributes = Object.fromEntries(
        Object.entries(attributes).sort(
          ([, aCount], [, bCount]) => aCount - bCount,
        ),
      );

      return { ...sortedTraits, [traitCategory]: sortedAttributes };
    }

    return sortedTraits;
  }, {} as CollectionTraits);
}
