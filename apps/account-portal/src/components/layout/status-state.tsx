import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";

/** Centered status block (404, errors, coming soon): icon, kicker, title, copy, actions. */
export function StatusState({
  icon,
  eyebrow,
  title,
  description,
  children,
  actions,
  className,
}: {
  icon?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        {icon ? (
          <span className="bg-muted text-primary flex size-12 items-center justify-center rounded-full [&_svg]:size-6">
            {icon}
          </span>
        ) : null}
        <div className="space-y-2">
          {eyebrow ? <p className="realm-kicker">{eyebrow}</p> : null}
          <h1 className="realm-page-title">{title}</h1>
          {description ? (
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="w-full min-w-0">{children}</div> : null}
        {actions ? (
          <div className="flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row">
            {actions}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
