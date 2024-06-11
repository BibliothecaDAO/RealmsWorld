import { createContext, useContext, useEffect, useState } from "react";
import { getNetwork } from "@/lib/network";
import { Space } from "@/types";

type SpaceProviderState = {
  space?: Space | null;
  setSpace: (theme: Space) => void;
};

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
        "0x00f6fefea3affabce38a3734fb1a9c235dd80243cfca52529545a439d7462cdd",
      );
      spaceData && setSpace(spaceData);
    };
    fetchProposals();
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

// eslint-disable-next-line react-refresh/only-export-components
export const useSpace = () => {
  const context = useContext(SpaceProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
