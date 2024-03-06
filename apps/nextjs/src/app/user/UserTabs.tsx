import { /*hexToNumber,*/ isStarknetAddress } from "@/utils/utils";
import { isAddress } from "viem";

import { NavLink } from "@realms-world/ui";

export const UserTabs = ({ address }: { address: string }) => {
  const isL2 = isStarknetAddress(address);

  const isL1 = isAddress(address);

  const tabs = [];
  if (isL1) {
    tabs.push(
      {
        name: "Realms",
        link: "",
      },
      {
        name: "Activity",
        link: "activity",
      },
    );
  }
  if (isL2) {
    tabs.push(
      { name: "Golden Token", link: "" },
      { name: "Beasts", link: "beasts" },
      { name: "Blobert", link: "blobert" },
    );
  }
  return (
    <div className=" mb-4 flex w-full space-x-4 border-b py-3 text-xl">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          exact
          href={`/user/${address}${tab.link && "/" + tab.link}`}
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};
