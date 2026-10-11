import{j as e}from"./iframe-CmnNeUbh.js";import{u as s,M as t}from"./blocks-DJywUAYg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-oCrqxWv1.js";function r(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Foundations/Start here"}),`
`,e.jsx(n.h1,{id:"account-portal-component-workbench",children:"Account portal component workbench"}),`
`,e.jsxs(n.p,{children:[`This Storybook renders the account portal's production components with the app's Tailwind styles
(`,e.jsx(n.code,{children:"src/styles.css"}),") and local brand fonts. ",e.jsx(n.strong,{children:"Dark is the default theme"}),`; use the toolbar to review light
and the viewport control for mobile.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Foundations"})," — colour roles, type hierarchy, radius and elevation (shared with the marketplace)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"UI"})," — shadcn primitives (",e.jsx(n.code,{children:"src/components/ui"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Layout"})," — page shell and page header."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dashboard"})," — homepage sections rendered from fixture props; no wallet or network is needed."]}),`
`]}),`
`,e.jsx(n.h2,{id:"token-rule",children:"Token rule"}),`
`,e.jsxs(n.p,{children:["Use semantic utilities only: ",e.jsx(n.code,{children:"bg-card"}),", ",e.jsx(n.code,{children:"text-muted-foreground"}),", ",e.jsx(n.code,{children:"border-border"}),", ",e.jsx(n.code,{children:"text-primary"}),`,
`,e.jsx(n.code,{children:"text-trade-up"}),"… Never ",e.jsx(n.code,{children:"bg-[#…]"}),", ",e.jsx(n.code,{children:"text-[color:var(--…)]"}),", one-off ",e.jsx(n.code,{children:"shadow-[…]"}),` or ad-hoc radii.
Add new roles to `,e.jsx(n.code,{children:"src/styles.css"})," (",e.jsx(n.code,{children:":root"}),", ",e.jsx(n.code,{children:".dark"})," and ",e.jsx(n.code,{children:"@theme inline"}),") instead."]}),`
`,e.jsx(n.h2,{id:"commands",children:"Commands"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"pnpm --filter @realms-world/account-portal storybook"})," — dev server on :6006"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"pnpm --filter @realms-world/account-portal storybook:build"})," — static build to ",e.jsx(n.code,{children:"storybook-static/"})]}),`
`]})]})}function h(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{h as default};
