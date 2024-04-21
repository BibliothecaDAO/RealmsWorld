/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import type { getAttributes } from "@/lib/reservoir/getAttributes";
import { use, useState } from "react";
import NumberSelect from "@/app/_components/NumberSelect";
import useDebounce from "@/hooks/useDebounce";
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
  Slider,
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
  const finalAttributes = [
    {
      id: 9999,
      key: "Status",
      kind: "string",
      values: ["Buy Now Only", "All"].map((value) => ({ value })),
    },
    ...(attributesFetched?.items ?? attributes ?? []),
  ];
  if (finalAttributes?.length < 2) {
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
                  <AccordionTrigger className="bg-primary px-2 py-2 text-sm">
                    {attribute.key} (
                    {Array.isArray(attribute.values) && attribute.values.length}
                    )
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
                                className={`font-body my-1 mr-1 ${attribute.key == "Status" && "w-full"}`}
                              >
                                {a.value} {a.tokenCount && `(${a.tokenCount})`}
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {attribute.kind === "number" && (
                        <div className="flex space-x-2 px-2">
                          {(() => {
                            if (!Array.isArray(attribute.values)) return null;
                            const values = attribute.values.map(
                              (v: { value: number }) => v.value,
                            );
                            const minRange =
                              "minRange" in attribute
                                ? attribute.minRange
                                : Math.min(...values);
                            const maxRange =
                              "maxRange" in attribute
                                ? attribute.maxRange
                                : Math.max(...values);

                            const [attrVal, setAttrValue] = useState<string>(
                              [minRange, maxRange].toString(),
                            );
                            const rangeValues = attrVal.split(",").map(Number);
                            return (
                              <>
                                {(minRange || minRange == 0) && maxRange ? (
                                  <div className="w-full">
                                    <div className="flex justify-between w-full mb-0.5"> <span>{rangeValues[0]} </span><span>{rangeValues[1]}</span></div>
                                    <Slider
                                      min={minRange}
                                      max={maxRange}
                                      minStepsBetweenThumbs={1}
                                      defaultValue={[minRange, maxRange]}
                                      onValueChange={(value) =>
                                        setAttrValue(value.toString())
                                      }
                                    ></Slider>
                                  </div>
                                ) : (
                                  <NumberSelect
                                    min={minRange ?? 0}
                                    max={maxRange ?? 100000}
                                    onChange={(value) =>
                                      handleAttributeClick(attribute.key, value)
                                    }
                                  />
                                )}
                                <Button
                                  //disabled={!isKeyInQuery(attribute.key)}
                                  variant={"default"}
                                  size={"xs"}
                                  className="px-1"
                                  onClick={() =>
                                    //handleAttributeClick(attribute.key, "")
                                    handleAttributeClick(attribute.key, attrVal)
                                  }
                                >
                                  Submit
                                </Button>
                              </>
                            );
                          })()}
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
