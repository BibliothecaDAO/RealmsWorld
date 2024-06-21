import Link from "next/link";
import Discord from "@/icons/discord.svg";
import Telegram from "@/icons/telegram.svg";
import X from "@/icons/x.svg";
import { ExternalLink, GithubIcon, Globe } from "lucide-react";

import { Button } from "@realms-world/ui";

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
      icon: <Discord className="h-[22px] w-[22px] fill-current" />,
      value: discord,
    },
    {
      icon: <X className="h-[22px] w-[22px]" />,
      value: x ? "https://x.com/" + x : undefined,
    },
    { icon: <Globe />, value: website },
    { icon: <GithubIcon />, value: github },
    { icon: <Telegram className="h-6 w-6" />, value: telegram },
  ];

  return (
    <div className="flex gap-3">
      {links.map((social, index) => {
        if (social.value)
          return (
            <Button size={"sm"} variant={"outline"} asChild>
              <Link key={index} href={`${social.value}`}>
                {social.icon}
              </Link>
            </Button>
          );
      })}
    </div>
  );
};
