"use client";

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { VariantProps } from "class-variance-authority";

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
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  variant = isActive ? "default" : "ghost";

  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      href={href}
    >
      {children}
    </Link>
  );
};
