"use client"

import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export const ImageGallery = ({ images }: { images: any }) => {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((oldIndex) => (oldIndex + 1) % images.length);
    };

    const previousImage = () => {
        setIndex((oldIndex) => (oldIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div>
                <Image
                    key={index}
                    alt={images[index].alt}
                    src={images[index].src}
                    width={1000}
                    placeholder="blur"
                    height={500}
                    className="w-full rounded"
                    blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mNkrmdgAAABkwCE1XPyYQAAAABJRU5ErkJggg=="}
                />
            </div>
            {/* <div className="flex justify-between my-2">
                <Button size={'xs'} onClick={previousImage}>Previous</Button>
                <Button size={'xs'} onClick={nextImage}>Next</Button>
            </div> */}
            <div className="flex space-x-2 my-2">
                {images.map((image: any, idx: number) => (
                    <div
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className="cursor-pointer">
                        <Image
                            alt={image.alt}
                            src={image.src}
                            width={100}
                            height={100}
                            className="w-32"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};