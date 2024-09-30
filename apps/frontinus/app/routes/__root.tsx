import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import type { QueryClient } from '@tanstack/react-query'

import { cookieParser } from '@/utils/cookies'

/*import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
} from "@starknet-react/core";*/
import { ThemeProvider } from "@/components/layout/theme-provider"
import { DefaultCatchBoundary } from '@/components/layout/DefaultCatchBoundary'
import { NotFound } from '@/components/layout/NotFound'
import "@realms-world/styles/globals.css?url";
import appCss from '@/App.css?url'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@realms-world/ui/components/ui/sidebar';
import { ModeToggle } from '@/components/layout/mode-toggle';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  loader: async () => {
    const cookies = await cookieParser('sidebar:state')
    return cookies
  },
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'Frontinus House',
    },
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: "" },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    },
  ],
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const cookies = Route.useLoaderData()
  /*const chains = [sepolia];
  const provider = publicProvider();
  const connectors = [braavos(), argent()];*/
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      {/*<StarknetConfig chains={chains} provider={provider} connectors={connectors}>*/}
      <ThemeProvider
        defaultTheme="dark" storageKey="vite-ui-theme"
      >
        <Body>
          <SidebarLayout
            defaultOpen={cookies === "true"}
          >
            <AppSidebar />
            <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
              <div className="border-b w-full flex justify-between h-[3.05rem] items-center px-4">
                <SidebarTrigger />
                <ModeToggle />
              </div>
              {children}
            </main>
          </SidebarLayout>

          <ScrollRestoration />
          <Scripts />
        </Body>
      </ThemeProvider>
      {/*</StarknetConfig>*/}

    </Html>
  )
}


