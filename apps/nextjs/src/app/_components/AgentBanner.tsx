"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion"; // Import useInView

export const AgentBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-250px" }); // Trigger animation once
  return (
    <div ref={ref} className="my-12 flex flex-col items-center md:flex-row">
      <div className="w-full md:w-1/2">
        <Image
          src="/elizaOS.avif"
          alt="Banner Image"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full p-4 md:w-1/2">
        <div className="mx-auto max-w-lg">
          <motion.h2
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Realms AI x Daydreams x Eliza (AI16z)
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Play with generative onchain game agents on Eternum and other Dojo
            games on Starknet. The Eliza Daydreams protocol enables the creation
            of agents capable of complex problem solving and adaptation to
            thrive in Realms World
          </motion.p>
          <motion.a
            className="mt-4 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            href="https://github.com/daydreamsai/daydreams"
            target="_blank"
          >
            Read more about Eliza Daydreams
          </motion.a>
        </div>
      </div>
    </div>
  );
};
