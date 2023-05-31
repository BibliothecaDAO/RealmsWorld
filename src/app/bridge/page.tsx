"use client";

import { Tabs } from "@/app/components/Tabs";
import { Deposit } from "./Deposit";

export default async function Page() {
  const tabs = [
    {
      name: "Deposit",
      content: <Deposit />,
    },
    {
      name: "Withdraw",
      content: <div>test</div>,
    },
  ];
  return (
    <div className="mx-auto border w-60 rounded-lg container flex-col mt-20 w-96 p-8">
      <Tabs tabs={tabs} />
    </div>
  );
}
