import type { Metadata } from "next";

import { PageLayout } from "../_components/PageLayout";
import { DashBoard } from "./Dashboard";

export const metadata: Metadata = {
  title: "Games of the Realms",
  description:
    "Fully Onchain Games in the Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <PageLayout title="Lords Tokenomics">
      <div className="pb-8 md:text-2xl">
        The Lords token is the native token of the Realms Autonomous World. It
        is governed by BibliothecaDAO who controls the issuance of the token.
      </div>
      <DashBoard />
    </PageLayout>
  );
}
