import Link from "next/link";

export const Footer = () => {
  /*const defaultImage = "/backgrounds/footer.webp";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };*/

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
    <div className="p my-24 w-full px-4">
      <div className="pt-10 sm:pl-56">
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
    </div>
  );
};
