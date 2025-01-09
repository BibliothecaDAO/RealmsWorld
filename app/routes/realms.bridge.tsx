import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/realms/bridge')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/realms/bridge"!</div>
}
