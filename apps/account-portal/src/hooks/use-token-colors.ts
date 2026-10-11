import { useEffect, useState } from "react";

/**
 * Resolve CSS custom properties (e.g. "--primary", "--chart-1") to concrete colours for
 * canvas APIs that can't read tokens. Re-reads when the theme class changes. Falls back
 * to `fallback` for any token that is missing.
 */
export function useTokenColors(tokens: string[], fallback: string[]): string[] {
  const [colors, setColors] = useState(fallback);
  const key = tokens.join(",");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      const style = getComputedStyle(root);
      setColors(
        key
          .split(",")
          .map(
            (token, i) =>
              style.getPropertyValue(token).trim() ||
              fallback[i % fallback.length] ||
              "",
          )
          .filter(Boolean),
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return colors;
}
