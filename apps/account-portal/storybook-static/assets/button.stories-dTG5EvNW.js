import{j as e}from"./iframe-CmnNeUbh.js";import{B as a}from"./button-BKTcJjS8.js";import{c as d}from"./createLucideIcon-B5MRR43i.js";import{P as m}from"./plus-B1igQsrm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0hVRxMJ.js";import"./index-37h3C_Hi.js";const u=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],p=d("arrow-right",u),{expect:x,fn:g}=__STORYBOOK_MODULE_TEST__,i=["default","secondary","outline","ghost","link","destructive"],w={title:"UI/Button",component:a,args:{children:"Continue",onClick:g()},argTypes:{variant:{control:"select",options:i},size:{control:"select",options:["xs","sm","default","lg","icon","icon-sm"]}}},r={play:async({canvas:n,userEvent:c,args:l})=>{await c.click(n.getByRole("button",{name:"Continue"})),await x(l.onClick).toHaveBeenCalledOnce()}},t={args:{disabled:!0}},s={render:()=>e.jsx("div",{className:"flex flex-wrap gap-3",children:i.map(n=>e.jsx(a,{variant:n,children:n},n))})},o={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(a,{size:"xs",children:"Extra small"}),e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{children:"Default"}),e.jsxs(a,{size:"lg",children:["Large ",e.jsx(p,{})]}),e.jsx(a,{size:"icon",variant:"outline","aria-label":"Add",children:e.jsx(m,{})})]})},S=["Primary","Disabled","Variants","Sizes"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent,
    args
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Continue"
    }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      {variants.map(variant => <Button key={variant} variant={variant}>
          {variant}
        </Button>)}
    </div>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">
        Large <ArrowRight />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <Plus />
      </Button>
    </div>
}`,...o.parameters?.docs?.source}}};export{t as Disabled,r as Primary,o as Sizes,s as Variants,S as __namedExportsOrder,w as default};
