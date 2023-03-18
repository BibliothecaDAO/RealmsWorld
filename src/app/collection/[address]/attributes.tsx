"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

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
    <div className="flex p-8">
      {attributes.attributes.map((attribute: any, index: number) => {
        return (
          <div key={index}>
            {attribute.key}

            {attribute.kind === "string" &&
              attribute.values.map((a: any, i: any) => {
                return (
                  <button
                    key={i}
                    onClick={() => handleAttributeClick(attribute.key, a.value)}
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                  >
                    {a.value}
                  </button>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
