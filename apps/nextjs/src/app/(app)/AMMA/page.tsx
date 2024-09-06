import { Button } from "@realms-world/ui";
import { PageLayout } from "../../_components/PageLayout";
import Image from "next/image"
import { ChevronDown, Play } from "lucide-react";
import Link from "next/link";
import { HeraldSignup } from "../../_components/HeraldSignup";
import Starknet from "@/icons/starknet.svg";
import Stamp from "@/icons/stamp.svg";
import { HeraldCarousel } from "./HeraldCarousel";

// Constants for repeated values
const ZIGZAG_IMAGE = '/blog/amma/zigzag.png';
const PRIMARY_COLOR = 'text-primary';

// Extracted component for ChevronDown
const DoubleChevronDown = () => (
  <div className="mx-auto w-12 mb-8">
    <ChevronDown />
    <ChevronDown className="-mt-4" />
  </div>
);
// Extracted component for game links
interface GameLinkProps {
  href: string;
  imageSrc: string;
  alt: string;
}

const GameLink: React.FC<GameLinkProps> = ({ href, imageSrc, alt }) => (
  <Link href={href}>
    <Image
      className="transition-all duration-200 mx-auto hover:-translate-y-1.5 mb-5"
      alt={alt}
      src={imageSrc}
      width={636}
      height={105}
      loading="lazy"
    />
  </Link>
);

export const metadata = {
  title: "AMMA Event",
  description: "AMMA x Realms Partnership - Created for adventurers by Bibliotheca DAO",
};

export default function Page() {
  return (
    <PageLayout>
      <div className="overflow-x-hidden relative sm:mx-auto text-center mb-24 max-w-[960px] w-[100vw] sm:w-auto -mx-4 -mt-7">
        <div className="sm:rounded-[30px] h-[30rem] sm:h-72 bg-gradient-to-r from-[#4295CD] to-[#326EC9] -mb-48 sm:-mb-64"></div>
        {/* Main image */}
        <Image
          className="sm:rounded-b-[30px]  h-auto"
          alt="AMMA Welcome"
          src='/blog/amma/mainimg.png'
          width={960}
          height={542}
          unoptimized={true}
          priority
        />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end mb-12 sm:px-4">
          <div className="relative animate-slide-in-left max-sm:-ml-8">
            <Image
              className="absolute -top-8 right-0 animate-bounce"
              alt="AMMA Welcome"
              src='/blog/amma/gm-bubble.png'
              width={103}
              height={53}
            />
            <Image
              alt="AMMA Welcome"
              src='/blog/amma/blobert1.png'
              className="w-44 sm:w-auto  hover:animate-wiggle"
              width={220}
              height={220}
            />
          </div>
          <div className="animate-slide-in-right max-sm:-mr-8">
            <Image
              className="object-contain  w-44 sm:w-auto"
              alt="AMMA Welcome"
              src='/blog/amma/blobert2.png'
              width={220}
              height={220}
            /></div>
        </div>

        <div className="absolute top-0 left-0 right-0 text-center mt-20 text-white">
          <h1 className="font-sans-serif text-3xl font-bold tracking-[0.7em] uppercase text-primary">Welcome</h1>
          <h2 className="text-4xl tracking-wide">AMMA X Realms</h2>
          <p className="max-w-[300px] mx-auto text-xl mt-8 tracking-widest font-semibold">Realms is an online high-fantasy <span className="text-primary font-bold">Game Publisher</span> with dozens of games
            in Beta</p>

          <Link href={"/games"}>
            <Button
              className="mt-36 sm:mt-8 relative px-0"
              variant={'ghost'}
            >
              <Stamp />
              <span className="absolute top-0 left-0 mt-2.5 tracking-widest w-full">
                Explore</span>
            </Button>
          </Link>

        </div>
      </div>
      <div className="text-center w-full">
        <h2 className="mx-auto text-xl uppercase max-w-[350px] mb-4">Learn more about AMMA, Realms World & our partnership</h2>
        <DoubleChevronDown />

        <Link href="https://www.youtube.com/watch?v=dKrKvCJs5UY" target="_blank" className="group relative inline-block">
          <Image className="mx-auto rounded-[30px] mb-4" alt="AMMA Welcome" src='/blog/amma/video-link.png' width={960} height={605} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-4 group-hover:bg-primary/75">
              <Play className="w-12 h-12 text-white group-hover:text-accent  group-hover:fill-accent" />
            </div>
          </div>
        </Link>
        <div className='text-center'>
          <Image className="mx-auto mb-12" alt="AMMA Welcome" src={ZIGZAG_IMAGE} width={280} height={16} />

          <h2 className={`text-3xl uppercase ${PRIMARY_COLOR} mb-4`}>Our Games</h2>
          <DoubleChevronDown />
          <div className="transition-all duration-1000 mb-12">
            <div className="transition-all duration-1000 mb-12">
              <GameLink href="/games/realms-eternum" imageSrc='/blog/amma/CA1.png' alt="Realms Eternum" />
              <GameLink href="/games/loot-survivor" imageSrc='/blog/amma/CA2.png' alt="Loot Survivor" />
              <GameLink href="/games/pistols" imageSrc='/blog/amma/CA3.png' alt="Pistols" />
              <GameLink href="/games/underdark" imageSrc='/blog/amma/CA4.png' alt="Underdark" />
              <GameLink href="/games/loot-underworld" imageSrc='/blog/amma/CA5.png' alt="Loot Underworld" />
            </div>
          </div>
          <Image className="mx-auto mb-12" alt="AMMA Welcome" src={ZIGZAG_IMAGE} width={280} height={16} />
          <h2 className={`text-3xl uppercase ${PRIMARY_COLOR} mb-8`}>Sign up to our newsletter "The Herald"</h2>
          <div className="flex items-start gap-x-4 container">
            <HeraldCarousel />
          </div>
          <p className="text-white mt-6">Get only game important news from our Eternum ecosystem:</p>
          <div className="flex max-w-prose mx-auto">
            <HeraldSignup />
          </div>
          <p className="text-sm text-white">By signing up, you agree to receive a barrage of emails from us. <span className="text-primary">Don't worry; it's mostly good stuff.</span></p>
          <Image className="mx-auto my-12" alt="divider" src={ZIGZAG_IMAGE} width={280} height={16} />

          <h3 className={`uppercase ${PRIMARY_COLOR} text-xl`}>Partners & Friends</h3>
          <div className="flex gap-x-5 items-center justify-center mx-auto mt-8">
            <Starknet className="w-12" />
            <Image className="" alt="AMMA Welcome" src='/blog/amma/LS.png' width={62} height={62} />
            <Image className="" alt="AMMA Welcome" src='/blog/amma/dojo.png' width={50} height={35} />
          </div>
          <Image className="mx-auto" alt="AMMA Welcome" src='/blog/amma/RWlogo.png' width={323} height={200} />
        </div>
      </div>
    </PageLayout >
  )
}
