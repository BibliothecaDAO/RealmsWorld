'use client';

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem/*, CarouselNext, CarouselPrevious*/ } from "@realms-world/ui";

import Image from "next/image"
import Link from "next/link";

export const HeraldCarousel = () => {
    const heraldImages = [
        {
            src: '/blog/amma/herald1.png',
            alt: 'Herald Image 1',
            href: 'https://thelootherald.substack.com/p/realms-revelry-arcades-ales-and-adventures'
        },
        {
            src: '/blog/amma/herald2.png',
            alt: 'Herald Image 2',
            href: 'https://thelootherald.substack.com/p/zkorp-and-grugs-lair-rule-dojo-game'
        },
        {
            src: '/blog/amma/herald_03.png',
            alt: 'Herald Image 1',
            href: 'https://thelootherald.substack.com/p/bloberts-as-far-as-the-eye-can-see'
        },
        {
            src: '/blog/amma/herald_04.png',
            alt: 'Herald Image 2',
            href: 'https://thelootherald.substack.com/p/starknet-doubles-down-on-realms-and'
        },
        {
            src: '/blog/amma/herald_05.png',
            alt: 'Herald Image 1',
            href: 'https://thelootherald.substack.com/p/realms-studio-progress-report'
        },
        {
            src: '/blog/amma/herald_06.png',
            alt: 'Herald Image 2',
            href: 'https://thelootherald.substack.com/p/summer-update-realms-leveling-up'
        },
    ];
    return (
        <Carousel className="w-full mx-auto" plugins={[
            Autoplay({
                delay: 4000,
            })]}>
            <CarouselContent>
                {heraldImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Link href={image.href} target="_blank">
                            <Image
                                className=""
                                alt={image.alt}
                                src={image.src}
                                width={479}
                                height={345}
                            />
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>)
}