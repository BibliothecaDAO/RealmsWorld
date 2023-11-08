import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <Image {...props} />,
    ...components,
  };
}
