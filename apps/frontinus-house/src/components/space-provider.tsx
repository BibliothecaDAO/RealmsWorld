import { createContext, useContext, useEffect, useState } from "react";
import { getNetwork } from "@/lib/network";
import type { Space } from "@/types";

interface SpaceProviderState {
  space?: Space | null;
  setSpace: (theme: Space) => void;
}

const initialState: SpaceProviderState = {
  space: null,
  setSpace: () => null,
};

const SpaceProviderContext = createContext<SpaceProviderState>(initialState);

//Should probably be replaced by Apollo React client

export function SpaceProvider({ children }: { children: React.ReactNode }) {
  const [space, setSpace] = useState<Space>();

  useEffect(() => {
    const fetchProposals = async () => {
      const spaceData = await getNetwork("sn-sep").api.loadSpace(
        "0x0011c8d7674bb371708933d29c5e2a4ea31a6535809950b863851373f1afc112",
      );
      if (spaceData) {
        setSpace(spaceData)
      }
    };
    fetchProposals().catch(console.error);
  }, []);

  const value = {
    space,
    setSpace: (space: Space) => {
      setSpace(space);
    },
  };

  return (
    <SpaceProviderContext.Provider value={value}>
      {children}
    </SpaceProviderContext.Provider>
  );
}

export const useSpace = () => {
  return useContext(SpaceProviderContext);
};
