import { StakingContainer } from "./StakingContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realm Staking",
};

export default function Page() {
  return <StakingContainer />;
}
