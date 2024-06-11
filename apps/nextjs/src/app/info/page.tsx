import type { Metadata } from "next";

import { PageLayout } from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Games of the Realms",
  description:
    "Fully Onchain Games in the Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default function Page() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl p-4">
        <section className="mb-6">
          <h1 className="text-2xl font-bold">Introduction</h1>
          <p>
            Realms World is a high performance network for ZK provable onchain
            games. The network is a multiverse filled with alternate dimensions:
            the games!
          </p>
          <p>
            We champion open source onchain gaming. Everyone has permission to
            build in the world - by creating, modding or extending games.
          </p>
          <p>
            From a technical perspective it is a Layer 3 blockchain optimised
            for onchain gaming. Realms World runs on the Starknet and Dojo tech
            stack.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Autonomous World</h2>
          <p>
            An autonomous world is a reality running on a blockchain. It is
            described as an autonomous world because with the right conditions
            it will ‘live’ indefinitely onchain, independent of control from a
            single entity.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Eternum</h2>
          <p>
            The Realms autonomous world is called Eternum. Eternum is the base
            layer for an onchain world, establishing resources, rules and
            initial physics.
          </p>
          <p>
            Eternum is part simulation, part game, part world. It is designed to
            be forever extendable by any party.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Onchain games</h2>
          <p>
            Onchain games use the blockchain as a ‘server’ which gives them
            qualities that centralized games do not have.
          </p>
          <p>
            For example, onchain games can’t be shut down by turning off the
            server. Games can be modded and extended by any user, not just the
            server owner.
          </p>
          <p>
            With onchain games the logic, state and assets of the game are all
            onchain.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Just Prove It</h2>
          <p>
            Games are fueled by computing power. Computation is normally
            extremely expensive on blockchains (think ‘gas’ costs).
          </p>
          <p>
            ZK proofs allow for ‘compression’ of computation into a ‘zip file’
            which stores just the outcome onchain - like who won a complex
            battle.
          </p>
          <p>
            Via ZK proofs, Realms World games have access to vast amounts of
            computation, so you can expect more punch from your gameplay.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Biblio DAO</h2>
          <p>
            Think of the Realms World as a network. The games and their
            creators, the network operators, and the players are all nodes in
            the network.
          </p>
          <p>
            This network is not owned by a corporation with opaque governance.
            The Realms World is a network t
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Why?</h2>
          <p>
            The mission is to create a meaningful world, experimenting with
            bleeding edge tech to create paradigm shifting entertainment.
          </p>
          <p>
            We believe that the most innovative space in gaming is onchain
            gaming and that it will become the most popular use case for the
            blockchain within a few years.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">History</h2>
          <p>
            Realms World emerged from the Loot project of 2021. Loot introduced
            the idea of collective world building on the blockchain.
          </p>
          <p>
            The Realms World has built upon this idea creating its own IP,
            partnering with Loot builders, advancing the autonomous world
            concept.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Loot Realms NFTs</h2>
          <p>
            If you own a Loot Realms NFT, you are part of Biblio DAO and are
            part of the Realms World network. You can vote in the DAO (‘BIPS’)
            and use the NFT to participate in resource production in Eternum.
          </p>
          <p>Realm NFT owners are called ‘Realm Lords’.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">$Lords</h2>
          <p>
            The currency of the Realms World and the gas token of the L3. $Lords
            is a fair launch token with broad distribution and listings across
            the Starknet ecosystem.
          </p>
          <p>Links: L1 contract. Uniswap pair. L2 contract. AVNU pair.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Players</h2>
          <p>
            Check out the games here. It is still early for onchain gaming. Loot
            Survivor is one of the earliest mainnet onchain games.
          </p>
          <p>You can be part of the movement by playtesting new games.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Studios & Devs</h2>
          <p>
            If you want to build in the Realms World you can start immediately.
            Fork the repo. Or pick up an open issue on OnlyDust.
          </p>
          <p>
            Looking for a deep partnership? Apply to be a Studio Partner or
            apply for a Frontinus House grant. Join the discord for info.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Market</h2>
          <p>
            There are many collections in the Realms World. You can browse them
            and buy in $Lords here.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
