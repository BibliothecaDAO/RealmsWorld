"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Disclosure, Transition } from "@headlessui/react";

export const Attributes = ({ attributes }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleAttributeClick = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="p-4">
      {attributes.attributes.map((attribute: any, index: number) => {
        return (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full py-2 border rounded border-white/20 bg-theme-gray">
                  {attribute.key}
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static className="p-2 text-gray-500">
                    {attribute.kind === "string" &&
                      attribute.values.map((a: any, i: any) => {
                        return (
                          <button
                            key={i}
                            onClick={() =>
                              handleAttributeClick(attribute.key, a.value)
                            }
                            className="px-1 py-1 mr-2 text-xs text-white bg-gray-500 rounded"
                          >
                            {a.value}
                          </button>
                        );
                      })}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
