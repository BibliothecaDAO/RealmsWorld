import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/** Thin brass bar at the top while a navigation is pending (shown after 150ms to avoid flicker). */
export function RouteProgress() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!pending) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, [pending]);

  return (
    <div
      aria-hidden
      data-visible={visible}
      className="route-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
    >
      <div className="bg-primary h-full w-1/3" />
    </div>
  );
}
