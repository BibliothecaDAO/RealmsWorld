"use client";

import NumberSelect from "@/app/_components/NumberSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button } from "@/app/_components/ui/button";
import { useQuery } from "@/hooks/useQuery";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export const AttributesDropdown = ({ address, attributes }: any) => {
  const {
    handleAttributeClick,
    isAttributeInQuery,
    isKeyInQuery,
    getQueriesFromUrl,
  } = useQuery();

  return (
    <div
      className={` ${"hidden"} w-screen overscroll-y-none p-3 sm:block sm:w-24 sm:flex-none sm:overscroll-auto lg:w-72`}
    >
      <div className="sticky  top-0 z-[100] overflow-y-auto pt-12">
        <ScrollArea.Root className="ScrollAreaRoot bg-dark-green border px-2">
          <ScrollArea.Viewport className="h-auto">
            <Button className="sm:hidden" variant={"default"}>
              Close
            </Button>
            {attributes.attributes?.map((attribute: any, index: number) => {
              return (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg">
                      {attribute.key}
                    </AccordionTrigger>
                    <AccordionContent>
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
                                {a.value}
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    </div>
  );
};
