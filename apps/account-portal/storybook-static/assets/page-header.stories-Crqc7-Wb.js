import{j as e}from"./iframe-CmnNeUbh.js";import{B as n}from"./button-BKTcJjS8.js";import{M as a}from"./metric-card-CiezY0YO.js";import{P as l}from"./page-container-DIWgmHsg.js";import{P as o}from"./page-header-DbrNP0Q8.js";import{G as i}from"./gavel-BLvxQOsq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0hVRxMJ.js";import"./index-37h3C_Hi.js";import"./card-BlWOSpjV.js";import"./createLucideIcon-B5MRR43i.js";const b={title:"Layout/PageHeader",component:o,parameters:{layout:"fullscreen"},args:{eyebrow:"Account",title:"Dashboard",description:"Your Realms, LORDS, rewards and governance across Ethereum and Starknet.",className:"mb-0"}},r={render:t=>e.jsx(l,{children:e.jsx(o,{...t,actions:e.jsxs(n,{variant:"outline",size:"sm",children:[e.jsx(i,{})," Market"]})})})},s={render:t=>e.jsxs(l,{children:[e.jsx(o,{...t}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 lg:grid-cols-4",children:[e.jsx(a,{label:"Total locked",value:"12.4M"}),e.jsx(a,{label:"Your veLORDS",value:"124,500"}),e.jsx(a,{label:"APY",value:"18.4%",valueClassName:"text-trade-up"}),e.jsx(a,{label:"Next unlock",value:"182d"})]})]})},f=["Default","InPageShell"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <PageContainer>
      <PageHeader {...args} actions={<Button variant="outline" size="sm">
            <Gavel /> Market
          </Button>} />
    </PageContainer>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <PageContainer>
      <PageHeader {...args} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total locked" value="12.4M" />
        <MetricCard label="Your veLORDS" value="124,500" />
        <MetricCard label="APY" value="18.4%" valueClassName="text-trade-up" />
        <MetricCard label="Next unlock" value="182d" />
      </div>
    </PageContainer>
}`,...s.parameters?.docs?.source}}};export{r as Default,s as InPageShell,f as __namedExportsOrder,b as default};
