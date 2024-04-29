import { getNetwork } from '@/lib/network'
import { Space } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'


type SpaceProviderState = {
  space?: Space | null
  setSpace: (theme: Space) => void
}

const initialState: SpaceProviderState = {
  space: null,
  setSpace: () => null,
}

const SpaceProviderContext = createContext<SpaceProviderState>(initialState)

//Should probably be replaced by Apollo React client

export function SpaceProvider({
  children,
}: {  children: React.ReactNode
}) {
  const [space, setSpace] = useState<Space>()

  useEffect(() => {
    const fetchProposals = async () => {
        const spaceData = await getNetwork("sn").api.loadSpace(
          "0x0041ada9121061198b52ae28edeec8ace7c23f2ba8d66938c129af1a2245701c"
        );
        spaceData && setSpace(spaceData);
      };
      fetchProposals();
  }, [])

  const value = {
    space,
    setSpace: (space: Space) => {
      setSpace(space)
    },
  }

  return (
    <SpaceProviderContext.Provider value={value}>
      {children}
    </SpaceProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSpace = () => {
  const context = useContext(SpaceProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}