import type { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/utils";

export interface SectionCardProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

/** A titled page section built on Card: brass IM Fell title, optional action and footer. */
export function SectionCard({
  title,
  description,
  action,
  footer,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-4">
        <div className="min-w-0 space-y-1">
          <CardTitle role="heading" aria-level={2}>
            {title}
          </CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      {children !== undefined ? (
        <CardContent className={cn("flex-1", contentClassName)}>
          {children}
        </CardContent>
      ) : null}
      {footer ? (
        <CardFooter className="flex-col gap-2 sm:flex-row">{footer}</CardFooter>
      ) : null}
    </Card>
  );
}
