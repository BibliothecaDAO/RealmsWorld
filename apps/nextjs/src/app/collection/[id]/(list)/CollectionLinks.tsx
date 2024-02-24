import Link from "next/link";
import Discord from "@/icons/discord.svg";
import { ExternalLink, Globe, X } from "lucide-react";

interface Links {
  icon: React.ReactNode;
  value: string;
}

export const SocialLinks = ({ links }: { links: Links[] }) => {
  return (
    <div className="mx-auto flex justify-center space-x-2">
      {links.map((social, index) => {
        return (
          <Link key={index} href={`${social.value}`}>
            {social.icon}
          </Link>
        );
      })}
    </div>
  );
};

export const BuildLinks = ({
  collectionAddress,
  discord,
  twitter,
  website,
}: {
  collectionAddress: string;
  discord: string;
  twitter: string;
  website: string;
}): Links[] => {
  return [
    {
      icon: <ExternalLink />,
      value: collectionAddress,
    },
    {
      icon: <Discord className="h-[28px] w-[28px] fill-white" />,
      value: discord,
    },
    {
      icon: <X />,
      value: "https://twitter.com/" + twitter,
    },
    { icon: <Globe />, value: website },
  ];
};
