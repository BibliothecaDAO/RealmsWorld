import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
    component: LayoutComponent,
})

function LayoutComponent() {
    return (
        <div className="py-4 px-8">
            <Outlet />
        </div>
    )
}