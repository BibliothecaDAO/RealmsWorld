"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/utils/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50  dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 uppercase font-sans-serif border border-transparent ",
  {
    variants: {
      variant: {
        default:
          " text-white hover:bg-black dark:bg-slate-50 dark:text-slate-900 shadow-inner border",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600 border",
        outline:
          "bg-transparent border border-white/30 hover:bg-black dark:border-gray-700 dark:text-slate-100 dark:disabled:hover:bg-transparent",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-gray-700 dark:text-slate-100 border",
        ghost:
          "bg-transparent hover:bg-gray-700 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent hover:border",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-6 px-3 rounded-md text-xs",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, href, disabled, ...props }, ref) => {
    if (!disabled && href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={href}
          target={props.external ? "_blank" : ""}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
