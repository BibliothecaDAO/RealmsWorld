import Link from "next/link";
import Discord from "@/icons/discord.svg";
import { ExternalLink, Globe, X } from "lucide-react";

export const SocialIcons = ({
  x,
  website,
  discord,
  external,
}: {
  x?: string;
  website?: string;
  discord?: string;
  external?: string;
}) => {
  const links = [
    {
      icon: <ExternalLink />,
      value: external,
    },
    {
      icon: <Discord className="h-[28px] w-[28px] fill-current" />,
      value: discord,
    },
    {
      icon: <X />,
      value: "https://x.com/" + x,
    },
    { icon: <Globe />, value: website },
  ];

  return (
    <div className="mx-auto my-4 flex justify-center space-x-2">
      {links.map((social, index) => {
        if (social.value)
          return (
            <Link key={index} href={`${social.value}`}>
              {social.icon}
            </Link>
          );
      })}
    </div>
  );
};
