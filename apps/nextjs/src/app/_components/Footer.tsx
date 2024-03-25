import Link from "next/link";

export const Footer = () => {
  const footerLinks = [
    {
      name: "Bibliotheca DAO",
      href: "https://bibliothecadao.xyz/",
    },
    {
      name: "Discord",
      href: "https://discord.gg/realmsworld",
    },
    {
      name: "Brand Assets",
      href: "https://drive.google.com/drive/folders/17vrwIjwqifxBVTkHmxoK1VhQ31hVSbDH",
    },
    {
      name: "Shop",
      href: "https://shop.realms.world",
    },
  ];

  return (
    <div className="w-full py-24 sm:pl-36 sm:pt-24">
      <div className="w-full">
        <h1>Realms.World</h1>
      </div>
      <div className="mt-8">
        <ul>
          {footerLinks.map((item, index) => (
            <li className="my-1 py-1 text-lg" key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
