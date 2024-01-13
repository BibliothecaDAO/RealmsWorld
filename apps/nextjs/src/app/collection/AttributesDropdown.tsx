"use client";

import NumberSelect from "@/app/_components/NumberSelect";
import { useQuery } from "@/hooks/useQuery";
import { api } from "@/trpc/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  ScrollArea,
} from "@realms-world/ui";

export const AttributesDropdown = ({ address, attributes }: any) => {
  const {
    handleAttributeClick,
    isAttributeInQuery,
    isKeyInQuery,
    getQueriesFromUrl,
  } = useQuery();

  /*const [erc721Attributes, { isLoading }] =
    api.erc721Attributes.all.useSuspenseQuery(
      {
        contractAddress: address,
      },
      /*{
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      },
    );*/

  const finalAttributes = attributes.items ?? attributes?.attributes;
  return (
    <div
      className={` ${"hidden"} w-screen overscroll-y-none p-3 sm:block sm:w-24 sm:flex-none sm:overscroll-auto lg:w-72`}
    >
      <div className="sticky  top-0 z-[100] overflow-y-auto pt-12">
        <ScrollArea className="border bg-dark-green px-2">
          <Button className="sm:hidden" variant={"default"}>
            Close
          </Button>
          {finalAttributes?.map((attribute: any, index: number) => {
            return (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    {attribute.key}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-1">
                      {attribute.kind === "string" && (
                        <div className=" p-1">
                          {attribute.values.map((a: any, i: any) => {
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
                                className="my-1 mr-1"
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
                            min={attribute.minRange}
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
