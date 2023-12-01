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
  ];

  return (
    <div className="my-24 w-full " /*style={backgroundImageStyle}*/>
      <div className="container mx-auto px-10 pt-10 sm:px-32 ">
        <div className="w-full">
          <h1>Realms.World</h1>
        </div>
        <div>
          <ul>
            {footerLinks.map((item, index) => (
              <li className="my-2 py-2 text-xl" key={index}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
