"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/utils/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface StoredFile {
  alt: string;
  src: string;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StoredFile[];
  options?: EmblaOptionsType;
  showPreview?: boolean;
  autoPlay?: boolean;
  cover?: boolean;
}

export function Carousel({
  images,
  className,
  options,
  showPreview,
  autoPlay,
  cover,
  ...props
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...options },
    autoPlay ? [Autoplay()] : [],
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );

  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    },
    [scrollNext, scrollPrev],
  );

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    console.log(emblaApi.canScrollNext());
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (images.length === 0) {
    return (
      <div
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="bg-secondary flex aspect-square h-full w-full flex-1 items-center justify-center"
      >
        Placeholder Image
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div
          className="-ml-4 flex h-full touch-pan-y"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {images.map((image, index) => (
            <div
              className="relative h-full w-full min-w-0 flex-[0_0_100%]"
              key={index}
            >
              <Image
                aria-label={`Slide ${index + 1} of ${images.length}`}
                role="group"
                key={index}
                aria-roledescription="slide"
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className={cover ? "object-cover" : "object-contain"}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {showPreview && images.length > 1 ? (
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            variant="outline"
            //size="icon"
            className="mr-0.5 aspect-square h-7 w-7 rounded-none p-0 sm:mr-2 sm:h-8 sm:w-auto"
            disabled={prevBtnDisabled}
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-3 w-3 sm:h-6 sm:w-6" aria-hidden="true" />
            <span className="sr-only">Previous slide</span>
          </Button>
          {images.map((image, i) => (
            <Button
              key={i}
              variant="outline"
              //size="icon"
              className={cn(
                "focus-visible:ring-foreground group relative aspect-square h-full w-full max-w-[100px] rounded-none shadow-sm hover:bg-transparent",
                i === selectedIndex && "ring-foreground ring-1",
              )}
              onClick={() => scrollTo(i)}
              onKeyDown={handleKeyDown}
            >
              <div className="absolute inset-0 z-10 bg-zinc-950/20 group-hover:bg-zinc-950/40" />
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
              <span className="sr-only">
                Slide {i + 1} of {images.length}
              </span>
            </Button>
          ))}
          <Button
            variant="outline"
            //size="icon"
            className="ml-0.5 aspect-square h-7 w-7 rounded-none p-0 sm:ml-2 sm:h-8 sm:w-8"
            disabled={nextBtnDisabled}
            onClick={scrollNext}
          >
            <ChevronRight
              className="h-3 w-3 sm:h-4 sm:w-4"
              aria-hidden="true"
            />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
