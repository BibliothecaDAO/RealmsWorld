import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import {
    QueryClient,
    notifyManager,
} from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { DefaultCatchBoundary } from './components/layout/DefaultCatchBoundary'
import { NotFound } from './components/layout/NotFound'

import "@realms-world/styles/globals.css";
import "./App.css";


export function createRouter() {
    if (typeof document !== 'undefined') {
        notifyManager.setScheduler(window.requestAnimationFrame)
    }
    const queryClient = new QueryClient()

    // Set up a Router instance
    const router = routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: {
                queryClient,
            },
            defaultPreload: 'intent',
            defaultErrorComponent: DefaultCatchBoundary,
            defaultNotFoundComponent: () => <NotFound />,
        })
        , queryClient)
    return router
}
// Register things for typesafety
declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}

