"use client";

import * as React from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@realms-world/utils";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center transition-colors  disabled:opacity-50  dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:text-bright-yellow/60 data-[state=open]:bg-medium-dark-green uppercase border border-transparent ",
  {
    variants: {
      variant: {
        default:
          "text-medium-dark-green hover:bg-medium-dark-green bg-bright-yellow hover:text-bright-yellow shadow-inner border",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600 border",
        outline:
          "bg-transparent border hover:bg-bright-yellow/50 border-medium-dark-green",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-gray-700 dark:text-slate-100 border",
        ghost: "bg-transparent hover:text-flamingo hover:border",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-6 px-3 text-xs",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-8",
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
