"use client";

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/
import type { VariantProps } from "class-variance-authority";
import React from "react";
//import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@realms-world/utils";

import { buttonVariants } from "./button";

export interface NavLinkProps
  extends React.LinkHTMLAttributes<HTMLLinkElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href: string;
  exact: boolean;
}

export const NavLink = ({
  href,
  exact,
  children,
  variant,
  size,
  className,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  variant = "ghost";
  return (
    <a
      className={cn(
        buttonVariants({ variant, size, className }),
        isActive && "!text-flamingo",
      )}
      href={href}
    >
      {children}
    </a>
  );
};
