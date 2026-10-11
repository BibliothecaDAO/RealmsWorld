import{j as t}from"./iframe-CmnNeUbh.js";import{B as e}from"./button-BKTcJjS8.js";import{D as o,a as r,b as l,c as s,d as c,e as g,f as d,g as D}from"./dialog-CW3nehBa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0hVRxMJ.js";import"./index-37h3C_Hi.js";import"./index-C7KlMS5m.js";import"./createLucideIcon-B5MRR43i.js";import"./index-C6hXDJwU.js";const{expect:u,screen:p}=__STORYBOOK_MODULE_TEST__,C={title:"UI/Dialog",component:o},n={render:()=>t.jsxs(o,{children:[t.jsx(r,{asChild:!0,children:t.jsx(e,{variant:"outline",children:"Switch network"})}),t.jsxs(l,{children:[t.jsxs(s,{children:[t.jsx(c,{children:"Wrong network"}),t.jsx(g,{children:"Your wallet is connected to a different network. Switch to Starknet Mainnet to continue."})]}),t.jsxs(d,{children:[t.jsx(D,{asChild:!0,children:t.jsx(e,{variant:"outline",children:"Disconnect"})}),t.jsx(e,{children:"Switch to Mainnet"})]})]})]}),play:async({canvas:i,userEvent:a})=>{await a.click(i.getByRole("button",{name:"Switch network"})),await u(await p.findByRole("dialog")).toBeVisible()}},T=["Default"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Switch network</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wrong network</DialogTitle>
          <DialogDescription>
            Your wallet is connected to a different network. Switch to Starknet
            Mainnet to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Disconnect</Button>
          </DialogClose>
          <Button>Switch to Mainnet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Switch network"
    }));
    await expect(await screen.findByRole("dialog")).toBeVisible();
  }
}`,...n.parameters?.docs?.source}}};export{n as Default,T as __namedExportsOrder,C as default};
