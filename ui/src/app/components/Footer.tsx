"use client";

import Link from "next/link";

export const Footer = () => {
  const defaultImage = "/backgrounds/footer.webp";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(5, 5, 5, 1)), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const footerLinks = [
    {
      name: "Bibliotheca DAO",
      href: "https://bibliothecadao.xyz/",
    },
    {
      name: "Discord",
      href: "https://discord.gg/bibliothecadao",
    },
  ];

  return (
    <div className="w-full h-[500px]  mt-40 " style={backgroundImageStyle}>
      <div className="container px-10 sm:px-32 pt-10 mx-auto ">
        <div className="w-full">
          <h1>Realms.World</h1>
        </div>
        <div>
          <ul>
            {footerLinks.map((item, index) => (
              <li className="my-2 text-xl py-2" key={index}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
