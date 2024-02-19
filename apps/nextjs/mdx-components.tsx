import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { Button } from "@realms-world/ui";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      //@ts-expect-error wrong match with mdx
      <Image
        {...props}
        width={1600}
        height={900}
        className="max-w-screen my-8"
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Button: (props) => <Button {...props}>{props.text}</Button>,
    ...components,
  };
}
