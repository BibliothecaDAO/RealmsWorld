import{j as e}from"./iframe-CmnNeUbh.js";import{B as t}from"./button-BKTcJjS8.js";import{C as s,a as n,b as o,c as i,d,e as c,f as l}from"./card-BlWOSpjV.js";import{S as m}from"./section-card-BVf4EPyA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0hVRxMJ.js";import"./index-37h3C_Hi.js";const D={title:"UI/Card",component:s,parameters:{layout:"padded"}},a={render:()=>e.jsxs(s,{className:"max-w-md",children:[e.jsxs(n,{children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx(o,{children:"Staking"}),e.jsx(i,{children:"Lock LORDS to earn veLORDS rewards."})]}),e.jsx(d,{children:e.jsx(t,{size:"sm",variant:"outline",children:"Manage"})})]}),e.jsx(c,{className:"text-sm",children:"Your lock expires in 182 days."}),e.jsx(l,{children:e.jsx(t,{className:"w-full",children:"Stake LORDS"})})]})},r={name:"SectionCard",render:()=>e.jsx(m,{className:"max-w-xl",title:"Recent proposals",description:"Latest Realms DAO proposals.",action:e.jsx(t,{size:"sm",variant:"outline",children:"View all"}),children:e.jsx("p",{className:"text-muted-foreground text-sm",children:"Section body content."})})},f=["Default","Section"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Staking</CardTitle>
          <CardDescription>Lock LORDS to earn veLORDS rewards.</CardDescription>
        </div>
        <CardAction>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        Your lock expires in 182 days.
      </CardContent>
      <CardFooter>
        <Button className="w-full">Stake LORDS</Button>
      </CardFooter>
    </Card>
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: "SectionCard",
  render: () => <SectionCard className="max-w-xl" title="Recent proposals" description="Latest Realms DAO proposals." action={<Button size="sm" variant="outline">
          View all
        </Button>}>
      <p className="text-muted-foreground text-sm">Section body content.</p>
    </SectionCard>
}`,...r.parameters?.docs?.source}}};export{a as Default,r as Section,f as __namedExportsOrder,D as default};
