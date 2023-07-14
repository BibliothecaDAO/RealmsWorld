"use client"

import Image from "next/image";
import { useState } from "react";

export default function BlurImage({ src }: any) {
    const [isLoading, setLoading] = useState(true);

    return (
        <a href={src} className="group">
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-8 xl:aspect-h-8">
                <Image
                    alt=""
                    src={src}
                    height={400}
                    width={400}

                    className={`
                duration-500 ease-in-out group-hover:opacity-75
                ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                        })`}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
        </a>
    );
}