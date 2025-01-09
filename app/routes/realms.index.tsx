import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/realms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/realms/"!</div>
}
