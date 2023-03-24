"use client";

import NumberSelect from "./NumberSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "./ui/button";
import { useQuery } from "@/composables/useQuery";

export const Attributes = ({ attributes }: any) => {
  const { handleAttributeClick, isAttributeInQuery, isKeyInQuery } = useQuery();

  return (
    <div className="flex-none hidden sm:w-72 sm:block">
      {attributes.attributes.map((attribute: any, index: number) => {
        return (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                {attribute.key}
              </AccordionTrigger>
              <AccordionContent>
                {attribute.kind === "string" && (
                  <div className="flex flex-wrap p-1 overflow-y-scroll max-h-72">
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
                  <div className="flex px-2 space-x-2">
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
