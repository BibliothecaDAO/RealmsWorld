import Cartridge from "@/icons/Cartridge.svg";
import Dojo from "@/icons/Dojo.svg";
import RealmsWorld from "@/icons/RealmsWorld.svg";
import Starknet from "@/icons/Starknet-full.svg";
import Starkware from "@/icons/Starkware.svg";

export const Partners = () => {
  const partners = [
    {
      title: "Starkware",
      link: "https://www.starkware.co/",
      logo: (
        <Starkware className="w-48 fill-bright-yellow grayscale filter transition-all duration-300 hover:filter-none" />
      ),
    },
    {
      title: "Starknet",
      link: "https://starknet.io/",
      logo: (
        <Starknet className="w-48 fill-bright-yellow grayscale filter transition-all duration-300 hover:filter-none" />
      ),
    },
    {
      title: "Dojo",
      link: "https://dojoengine.org/",
      logo: (
        <Dojo className="w-48 fill-bright-yellow grayscale filter transition-all duration-300 hover:filter-none" />
      ),
    },
    {
      title: "Cartridge",
      link: "https://cartridge.gg/",
      logo: (
        <Cartridge className="w-48 fill-bright-yellow grayscale filter transition-all duration-300 hover:filter-none" />
      ),
    },
  ];
  return (
    <div className="flex justify-center  p-8">
      <div className="flex flex-wrap justify-center sm:flex-row sm:space-x-8">
        {partners.map((partner, index) => (
          <a
            target="_blank"
            href={partner.link}
            className="self-center p-3"
            key={index}
          >
            {partner.logo}
          </a>
        ))}
      </div>
    </div>
  );
};
