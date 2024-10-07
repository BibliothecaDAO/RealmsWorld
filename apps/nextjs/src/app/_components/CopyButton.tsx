"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

import { Button } from "@realms-world/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@realms-world/ui/components/ui/tooltip";
import { cn } from "@realms-world/utils";

export function CopyButton({
  text,
  displayText,
  ...props
}: {
  text: string;
  displayText?: string;
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "group [&_svg]:size-3.5",
              displayText
                ? "w-auto font-sans-serif normal-case"
                : "h-7 w-7 rounded-[1px]",
            )}
            onClick={async () => {
              await navigator.clipboard.writeText(text);
              setHasCopied(true);
            }}
            {...props}
          >
            <span className="sr-only">Copy</span>
            <span className="mr-2">{displayText}</span>
            {hasCopied ? (
              <CheckIcon />
            ) : (
              <ClipboardIcon
                className={displayText && "invisible group-hover:visible"}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Copy Address</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
