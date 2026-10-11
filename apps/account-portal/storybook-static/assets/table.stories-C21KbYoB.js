import{j as e}from"./iframe-CmnNeUbh.js";import{B as o}from"./badge-Cnq8EBia.js";import{T as r,a as d,b as n,c as s,d as m,e as l}from"./table-zGCrtqEQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-37h3C_Hi.js";import"./index-D0hVRxMJ.js";const c=[{tx:"0x04a1…9c2e",amount:"12,500",status:"Completed"},{tx:"0x07f3…11ab",amount:"3,200",status:"Pending"},{tx:"0x01bb…e0d4",amount:"860",status:"Completed"}],h={title:"UI/Table",component:r},t={render:()=>e.jsxs(r,{children:[e.jsx(d,{children:e.jsxs(n,{children:[e.jsx(s,{children:"Transaction"}),e.jsx(s,{className:"text-right",children:"LORDS"}),e.jsx(s,{children:"Status"})]})}),e.jsx(m,{children:c.map(a=>e.jsxs(n,{children:[e.jsx(l,{className:"font-mono",children:a.tx}),e.jsx(l,{className:"realm-stat text-right",children:a.amount}),e.jsx(l,{children:e.jsx(o,{variant:a.status==="Pending"?"outline":"secondary",children:a.status})})]},a.tx))})]})},j=["Default"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead className="text-right">LORDS</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => <TableRow key={row.tx}>
            <TableCell className="font-mono">{row.tx}</TableCell>
            <TableCell className="realm-stat text-right">{row.amount}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Pending" ? "outline" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...t.parameters?.docs?.source}}};export{t as Default,j as __namedExportsOrder,h as default};
