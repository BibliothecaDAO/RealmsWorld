import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        sizes="100vw"
        width={1500}
        height={845}
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    ...components,
  };
}
