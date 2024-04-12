import type { Metadata } from "next";

import { Button } from "@realms-world/ui";

import { PageLayout } from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Realms L3",
  description:
    "Fully Onchain Games in the Realms Autonomous World L3 - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <PageLayout title="Realms L3 - Powered by $lords">
      <div className="pb-8 md:text-2xl">
        The high-performance zkVm L3 for the Realms World of onchain gaming powered
        by $Lords.
      </div>

      <div className="mb-10 sm:w-1/2">
        <p>
          Realms L3 exists to enable the ambitious Realms Autonomous World. It
          is a collaboration between Bibliotheca DAO and Cartridge, designed and
          built around the dojo stack. This stack has been optimized for
          high-performance onchain gaming, allowing Realms L3 to support the
          demanding requirements of the autonomous world.
        </p>
      </div>

      <div className="sm:w-1/2">
        <h5>What is the Realms World L3?</h5>
        <p>
          Realms.World L3 stands as a high-performance zkVM network,
          specifically engineered to support high-performance onchain gaming.
          The network operates as a Starknet sequencer, ensuring that any
          Starknet contract can seamlessly run on the network. Sitting atop the
          public Starknet L2, it rolls-up its state onto Starknet. This allows
          for low transactions fees, high performance and high security
          guarantees. The entire stack is opensource and welcomes contributions.
          Find out more here
        </p>
      </div>

      <div className="mt-8">
        <Button href="https://dev.realms.world/">
          Developer Documentation
        </Button>
      </div>
    </PageLayout>
  );
}
