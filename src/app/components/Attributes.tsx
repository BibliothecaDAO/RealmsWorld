"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import NumberSelect from "./NumberSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "./ui/button";

export const Attributes = ({ attributes }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  console.log(attributes);

  const handleAttributeClick = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.has(key) && params.get(key) === value) {
      // If the attribute with the same value exists, delete it.
      params.delete(key);
    } else {
      // Otherwise, set the attribute to the new value.
      params.set(key, value);
    }

    router.replace(`${pathname}?${params}`);
  };

  const isAttributeInQuery = (key: string, value: string): boolean => {
    return searchParams.has(key) && searchParams.get(key) === value;
  };

  return (
    <div className="flex-none hidden sm:w-72 sm:block">
      {attributes.attributes.map((attribute: any, index: number) => {
        return (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                {attribute.key}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap p-1">
                  {attribute.kind === "string" &&
                    attribute.values.map((a: any, i: any) => {
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

                {attribute.kind === "number" && (
                  <div className="px-4">
                    <NumberSelect
                      min={attribute.minRange}
                      max={attribute.maxRange}
                      onChange={(value) =>
                        handleAttributeClick(attribute.key, value)
                      }
                    />
                    <button
                      onClick={() => handleAttributeClick(attribute.key, "")}
                    >
                      clear
                    </button>
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
