"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"

import { cn } from "@realms-world/utils"

export function NavSecondary({
    className,
    items,
}: {
    items: {
        title: string
        url: string
        icon: any
        items?: {
            title: string
            url: string
        }[]
    }[]
} & React.ComponentProps<"ul">) {
    if (!items?.length) {
        return null
    }

    return (
        <ul className={cn("grid gap-0.5", className)}>
            {items.map((item) => (
                <li key={item.title}>
                    <Link
                        href={item.url}
                        className="flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-sm ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2"
                    >
                        <item.icon className="h-4 w-4 shrink-0 translate-x-0.5 text-muted-foreground" />
                        <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium text-muted-foreground">
                            {item.title}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}