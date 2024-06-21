import Link from "next/link";
import Discord from "@/icons/discord.svg";
import Telegram from "@/icons/telegram.svg";
import X from "@/icons/x.svg";
import { ExternalLink, GithubIcon, Globe } from "lucide-react";

export const SocialIcons = ({
  x,
  website,
  discord,
  external,
  github,
  telegram,
}: {
  x?: string;
  website?: string;
  discord?: string;
  external?: string;
  github?: string;
  telegram?: string;
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
      icon: <X className="h-[26px] w-[26px]" />,
      value: x ? "https://x.com/" + x : undefined,
    },
    { icon: <Globe />, value: website },
    { icon: <GithubIcon />, value: github },
    { icon: <Telegram className="h-6 w-6" />, value: telegram },
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
