"use client";

import * as React from "react";
import LordsIcon from "@/icons/lords.svgr";
import { cva, VariantProps } from "class-variance-authority";
import type { animate, HTMLMotionProps } from "framer-motion";
import { stagger, useAnimate } from "framer-motion";

import type { ButtonProps } from "./button";
import { Button } from "./button";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

export type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, variant, size, href, disabled, ...props }, ref) => {
    const [scope, animate] = useAnimate();

    const onButtonClick = () => {
      const sparkles = Array.from({ length: 20 });
      const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
        `.sparkle-${index}`,
        {
          x: randomNumberBetween(-100, 100),
          y: randomNumberBetween(-100, 100),
          scale: randomNumberBetween(1.5, 2.5),
          opacity: 0.7,
        },
        {
          duration: 0.4,
          at: "<",
        },
      ]);

      const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
        `.sparkle-${index}`,
        {
          opacity: 0,
          scale: 0,
        },
        {
          duration: 0.3,
          at: "<",
        },
      ]);

      const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
        `.sparkle-${index}`,
        {
          x: 0,
          y: 0,
        },
        {
          duration: 0.000001,
        },
      ]);

      animate([
        ...sparklesReset,
        [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
        ["motion.button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
        ["motion.button", { scale: 1 }, { duration: 0.1 }],
        ...sparklesAnimation,
        [".letter", { y: 0 }, { duration: 0.000001 }],
        ...sparklesFadeOut,
      ]);
    };

    return (
      <Button
        ref={scope}
        onClick={() => {
          onButtonClick();
          props.onClick;
        }}
        className="relative"
        disabled={disabled}
        {...props}
        //whileHover={{ scale: 1.1 }}
      >
        {typeof children == "string" && (
          <span className="block h-8 overflow-hidden" aria-hidden>
            {children.split("").map((letter, index) => (
              <span
                data-letter={letter}
                className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </span>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 block"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <LordsIcon
              className={`absolute left-1/2 top-1/2 h-3 w-3 fill-white opacity-0 sparkle-${index}`}
              key={index}
            ></LordsIcon>
          ))}
        </span>
      </Button>
    );
  },
);
MotionButton.displayName = "MotionButton";

export { MotionButton };
