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

export const AttributesDropdown = ({ address, attributes }: any) => {
  const {
    handleAttributeClick,
    isAttributeInQuery,
    isKeyInQuery,
    getQueriesFromUrl,
  } = useQuery();

  return (
    <div
      className={` ${"hidden"} bg-theme-gray fixed left-0 top-0 z-[100] h-screen w-screen overflow-scroll overscroll-y-none p-3 sm:relative sm:block sm:w-24 sm:flex-none sm:overflow-y-hidden sm:overscroll-none lg:w-72`}
    >
      <Button className="sm:hidden" variant={"default"}>
        Close
      </Button>{" "}
      {attributes.attributes?.map((attribute: any, index: number) => {
        return (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                {attribute.key}
              </AccordionTrigger>
              <AccordionContent>
                {attribute.kind === "string" && (
                  <div className="flex max-h-72 flex-wrap overflow-y-scroll p-1">
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
                            handleAttributeClick(attribute.key, a.value)
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
                      onClick={() => handleAttributeClick(attribute.key, "")}
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
    </div>
  );
};
