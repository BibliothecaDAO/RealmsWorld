// Add custom declaration until turbo adds proper svg support
declare module "@/icons/*.svgr" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
