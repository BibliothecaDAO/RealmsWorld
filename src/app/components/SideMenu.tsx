import { Backpack, Map, Boxes, Twitter, Github } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = () => {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  const menu = [
    {
      name: "Collections",
      href: "/collection",
      icon: <Backpack />,
    },
    {
      name: "AMM",
      href: "/collection/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
      icon: <Boxes />,
    },
    {
      name: "Games",
      href: "/collection/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
      icon: <Map />,
    },
  ];

  const social = [
    {
      name: "Twitter",
      href: "https://twitter.com/lootrealms?lang=en",
      icon: <Twitter />,
    },
    {
      name: "Github",
      href: "https://github.com/BibliothecaDAO",
      icon: <Github />,
    },
  ];

  return (
    <div
      className={`hidden md:flex flex-col fixed z-100 h-screen  top-0 px-4 py-8 bg-black/30 z-20`}
    >
      <div className="flex flex-col mt-4 space-y-6">
        {menu.map((item, index) => {
          return (
            <Button href={item.href} key={index}>
              {item.icon}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col mt-auto space-y-6">
        {social.map((item, index) => {
          return (
            <Button href={item.href} key={index}>
              {item.icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
