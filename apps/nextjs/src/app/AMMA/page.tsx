import { Button } from "@realms-world/ui";
import { PageLayout } from "../_components/PageLayout";
import Image from "next/image"
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { HeraldSignup } from "../_components/HeraldSignup";
import Starknet from "@/icons/starknet.svg";

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
const GameLink = ({ href, imageSrc, alt }) => (
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
  description: "AMMA - Created for adventurers by Bibliotheca DAO",
};

export default function Page() {
  return (
    <PageLayout>
      <div className="relative text-center mb-24">
        {/* Main image */}
        <Image className="mx-auto rounded-[30px]" alt="AMMA Welcome" src='/blog/amma/main_image.jpg' width={960} height={605} priority />

        <div className="absolute bottom-0 w-full flex mb-12 px-24">
          <div className="mx-auto relative">
            <Image className="right-0 absolute -top-8" alt="AMMA Welcome" src='/blog/amma/gm-bubble.png' width={103} height={53} />
            <Image className="" alt="AMMA Welcome" src='/blog/amma/blobert1.png' width={220} height={220} />
          </div>
          <Image className="mx-auto object-contain" alt="AMMA Welcome" src='/blog/amma/blobert2.png' width={220} height={220} />
        </div>
        <div className="w-full absolute top-0 left-0 text-center mt-24 text-white">
          <h1 className="font-sans-serif text-3xl font-bold tracking-[0.7em] uppercase text-primary">Welcome</h1>
          <h2 className="text-4xl tracking-wide">AMMA X Realms</h2>
          <p className="max-w-[300px] mx-auto text-xl mt-8 tracking-widest font-semibold">Realms is an online high-fantasy <span className="text-primary font-bold">Game Publisher</span> with dozens of games
            in Beta</p>
          <Button className="mt-8 bg-[#74C9FE] border-[#2C428E] h-18 px-8 border-2 text-black" variant={'ghost'}>Explore</Button>
        </div>
      </div>
      <div className="text-center w-full">
        <h2 className="mx-auto text-xl uppercase max-w-[300px] mb-4">Learn more about realms world & our partnership</h2>
        <DoubleChevronDown />

        <Link href="https://www.youtube.com/watch?v=dKrKvCJs5UY" target="_blank">
          <Image className="mx-auto rounded-[30px] mb-4" alt="AMMA Welcome" src='/blog/amma/videolink.png' width={960} height={605} /></Link>
        <div className='text-center'>
          <p className="mb-4 text-xl"><span className="text-[#74C9FE]">1h:30m</span> interview with NEJ</p>
          <Image className="mx-auto mb-12" alt="AMMA Welcome" src={ZIGZAG_IMAGE} width={280} height={16} />

          <h2 className={`text-3xl uppercase ${PRIMARY_COLOR} mb-4`}>Our Games</h2>
          <DoubleChevronDown />
          <div className="transition-all duration-1000 mb-12">
            <GameLink href="/games/realms-eternum" imageSrc='/blog/amma/CA1.png' alt="Realms Eternum" />
            <GameLink href="/games/loot-survivor" imageSrc='/blog/amma/CA2.png' alt="Loot Survivor" />
            <GameLink href="/games/pistols" imageSrc='/blog/amma/CA3.png' alt="Pistols" />
            <GameLink href="/games/underdark" imageSrc='/blog/amma/CA4.png' alt="Underdark" />
            <GameLink href="/games/loot-underworld" imageSrc='/blog/amma/CA5.png' alt="Loot Underworld" />
          </div>
          <Image className="mx-auto mb-12" alt="AMMA Welcome" src={ZIGZAG_IMAGE} width={280} height={16} />
          <h2 className={`text-3xl uppercase ${PRIMARY_COLOR} mb-8`}>Sign up to our newsletter "The Herald"</h2>
          <div className="flex items-start gap-x-4 container">
            <Link href="https://thelootherald.substack.com/p/realms-revelry-arcades-ales-and-adventures" target="_blank">
              <Image className="" alt="Herald Image 1" src='/blog/amma/herald1.png' width={479} height={345} /></Link>
            <Link href="https://thelootherald.substack.com/p/zkorp-and-grugs-lair-rule-dojo-game" target="_blank">
              <Image className="" alt="Herald Image 2" src='/blog/amma/herald2.png' width={479} height={345} /></Link></div>
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
