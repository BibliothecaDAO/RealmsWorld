"use client";

import { useState } from "react";
import Image from "next/image";


import { env } from "env";
import { cn } from "@realms-world/utils";
import { Skeleton } from "@realms-world/ui/components/ui/skeleton";
import { AnimatedMap } from "./AnimatedMap";

interface MediaProps {
    // key used to access the image proxy / CDN
    mediaKey?: string | null;
    thumbnailKey?: string | null;
    alt: string;
    src?: string | null;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
}

function getMediaSrc(
    src?: string | null,
    mediaKey?: string | null,
    thumbnailKey?: string | null,
    width?: number,
    height?: number,
) {
    if (thumbnailKey) {
        return `${env.NEXT_PUBLIC_IMAGE_CDN_URL}/${thumbnailKey}`;
    }

    if (mediaKey && width && height) {
        const resolutionParam = `:${width}:${height}`;
        return `${env.NEXT_PUBLIC_IMAGE_PROXY_URL}/_/rs:fit${resolutionParam}/plain/${env.NEXT_PUBLIC_IMAGE_CDN_URL}/${mediaKey}`;
    }
    return src?.replace("ipfs://", env.NEXT_PUBLIC_IPFS_GATEWAY);
}

function MediaPlaceholder({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex flex-shrink-0 items-center justify-center bg-secondary",
                className,
            )}
        >
            <AnimatedMap />
        </div>
    );
}

export default function Media({
    mediaKey,
    thumbnailKey,
    alt,
    className,
    src,
    width = 600,
    height = 600,
    priority = false,
}: MediaProps) {
    const [status, setStatus] = useState<"loading" | "error" | "loaded">(
        "loading",
    );
    const mediaSrc = getMediaSrc(src, mediaKey, thumbnailKey, width, height);
    const mediaFormat = mediaSrc?.split(".").pop() === "mp4" ? "video" : "image";

    if (!mediaSrc || status === "error") {
        return <MediaPlaceholder className={className} />;
    }

    if (mediaFormat === "video") {
        return (
            <video autoPlay className={cn("flex-shrink-0", className)} loop muted>
                <source src={mediaSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    return (
        <>
            <div className="relative flex-shrink-0">
                {status === "loading" && (
                    <Skeleton className="absolute inset-0 flex-shrink-0" />
                )}
                <Image
                    unoptimized
                    priority={priority}
                    alt={alt}
                    className={cn("flex-shrink-0", className)}
                    onError={() => setStatus("error")}
                    onLoadStart={() => setStatus("loading")}
                    onLoad={() => setStatus("loaded")}
                    src={mediaSrc}
                    height={height}
                    width={width}
                />
            </div>
        </>
    );
}