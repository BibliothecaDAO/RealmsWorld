// Add custom declaration until turbo adds proper svg support
declare module "@/icons/*.svg" {
  import type React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
