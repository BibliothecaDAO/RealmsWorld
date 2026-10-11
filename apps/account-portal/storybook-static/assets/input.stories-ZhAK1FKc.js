import{j as t}from"./iframe-CmnNeUbh.js";import{I as o}from"./input-D9O02OBJ.js";import{L as n}from"./label-CfIPhPVa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CRf0vBm4.js";import"./index-D0hVRxMJ.js";import"./index-37h3C_Hi.js";const b={title:"UI/Input",component:o,args:{placeholder:"0x…","aria-label":"Address"}},a={},e={args:{disabled:!0}},r={args:{"aria-invalid":!0,defaultValue:"abc"}},s={render:()=>t.jsxs("div",{className:"grid max-w-sm gap-2",children:[t.jsx(n,{htmlFor:"amount",children:"Amount"}),t.jsx(o,{id:"amount",type:"number",placeholder:"0.00"})]})},g=["Default","Disabled","Invalid","WithLabel"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-invalid": true,
    defaultValue: "abc"
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid max-w-sm gap-2">
      <Label htmlFor="amount">Amount</Label>
      <Input id="amount" type="number" placeholder="0.00" />
    </div>
}`,...s.parameters?.docs?.source}}};export{a as Default,e as Disabled,r as Invalid,s as WithLabel,g as __namedExportsOrder,b as default};
