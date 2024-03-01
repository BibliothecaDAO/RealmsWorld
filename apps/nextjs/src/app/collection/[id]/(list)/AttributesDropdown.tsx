/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import type { getAttributes } from "@/lib/reservoir/getAttributes";
import { use } from "react";
import NumberSelect from "@/app/_components/NumberSelect";
import { useQuery } from "@/hooks/useQuery";
import { api } from "@/trpc/react";

import type { RouterOutputs } from "@realms-world/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  ScrollArea,
} from "@realms-world/ui";

export const AttributesDropdown = ({
  address,
  attributes,
  attributesPromise,
}: {
  address: string;
  attributes?: Awaited<ReturnType<typeof getAttributes>>["attributes"];
  attributesPromise?: Promise<RouterOutputs["erc721Attributes"]["all"]>;
}) => {
  const { handleAttributeClick, isAttributeInQuery, isKeyInQuery } = useQuery();
  const { data: attributesFetched } = api.erc721Attributes.all.useQuery(
    {
      contractAddress: address,
    },
    {
      initialData: attributesPromise ? use(attributesPromise) : undefined,
      enabled: attributesPromise ? true : false,
    },
  );
  const finalAttributes = attributesFetched?.items ?? attributes;

  if (!finalAttributes?.length) {
    return null;
  }
  return (
    <div
      className={` ${"hidden"} w-screen overscroll-y-none pr-6 sm:block sm:w-24 sm:flex-none sm:overscroll-auto lg:w-72`}
    >
      <div className="sticky top-10 z-[100]">
        <ScrollArea className="h-[600px] border-2 bg-dark-green px-3">
          <Button className="sm:hidden" variant={"default"}>
            Close
          </Button>
          {finalAttributes?.map((attribute, index: number) => {
            return (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-primary px-2 text-sm">
                    {attribute.key} ({Array.isArray(attribute.values) && attribute.values.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-1">
                      {attribute.kind === "string" && (
                        <div className=" p-1">
                          {//@ts-expect-error trpc typings of drizzle sql
                          attribute.values?.map((a, i: number) => {
                            return (
                              <Button
                                key={i}
                                size={"sm"}
                                variant={
                                  isAttributeInQuery(attribute.key, a.value)
                                    ? "default"
                                    : "outline"
                                }
                                onClick={() =>
                                  handleAttributeClick(
                                    attribute.key,
                                    a.value,
                                    attribute.key == "Resource",
                                  )
                                }
                                className="font-body my-1 mr-1"
                              >
                                {a.value} ({a.tokenCount})
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {attribute.kind === "number" && (
                        <div className="flex space-x-2 px-2">
                          <NumberSelect
                            //@ts-expect-error range to be added to l2
                            min={attribute.minRange}
                            //@ts-expect-error range to be added to l2
                            max={attribute.maxRange}
                            onChange={(value) =>
                              handleAttributeClick(attribute.key, value)
                            }
                          />
                          <Button
                            disabled={!isKeyInQuery(attribute.key)}
                            variant={"default"}
                            onClick={() =>
                              handleAttributeClick(attribute.key, "")
                            }
                          >
                            clear
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
};
