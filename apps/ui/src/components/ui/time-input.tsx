"use client";

import type { AriaTimeFieldProps, TimeValue } from "@react-aria/datepicker";
import type { DateFieldState, DateSegment } from "@react-stately/datepicker";
import * as React from "react";
import { useDateSegment, useTimeField } from "@react-aria/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import { cn } from "@realms-world/utils";

import { inputBaseStyles } from "./input";

interface TimeSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
}

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { segmentProps } = useDateSegment(segment, state, ref);

  const isColon = segment.type === "literal" && segment.text === ":";
  const isSpace = segment.type === "literal" && segment.text === " ";

  const isDecorator = isColon || isSpace;

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        "txt-compact-medium w-full rounded-md px-2 py-[5px] text-left uppercase tabular-nums",
        inputBaseStyles,
        "group-aria-[invalid=true]/time-input:!shadow-borders-error group-invalid/time-input:!shadow-borders-error",
        {
          "text-ui-fg-muted !w-fit border-none bg-transparent px-0 shadow-none":
            isDecorator,
          hidden: isSpace,
          "text-ui-fg-disabled bg-ui-bg-disabled border-ui-border-base shadow-none":
            state.isDisabled,
          "!text-ui-fg-muted !bg-transparent": !segment.isEditable,
        },
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "txt-compact-medium text-ui-fg-muted pointer-events-none block w-full text-left",
          {
            hidden: !segment.isPlaceholder,
            "h-0": !segment.isPlaceholder,
          },
        )}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  "label" | "shouldForceLeadingZeros" | "description" | "errorMessage"
>;

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  ({ hourCycle, ...props }: TimeInputProps, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => innerRef.current,
    );

    const locale = window.navigator.language || "en-US";

    const state = useTimeFieldState({
      hourCycle,
      locale,
      shouldForceLeadingZeros: true,
      autoFocus: true,
      ...props,
    });

    const { fieldProps } = useTimeField(
      {
        ...props,
        hourCycle: hourCycle,
        shouldForceLeadingZeros: true,
      },
      state,
      innerRef,
    );

    return (
      <div
        {...fieldProps}
        ref={innerRef}
        className="group/time-input inline-flex w-full gap-x-2"
      >
        {state.segments.map((segment, i) => (
          <TimeSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    );
  },
);
TimeInput.displayName = "TimeInput";

export { TimeInput };
