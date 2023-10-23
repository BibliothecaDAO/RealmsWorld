import type { Metadata } from "next";
import { Bai_Jamjuree, Karla } from "next/font/google";
import Sidebar from "@/app/_components/SideMenu";

import { Provider } from "./providers/providers";

import "@/styles/globals.css";

import { headers } from "next/headers";

import { Footer } from "./_components/Footer";
import { TopNav } from "./_components/TopNav";
import { TRPCReactProvider } from "./providers/TRPCProvider";
import { UIContextProvider } from "./providers/UIProvider";
import { WalletsProvider } from "./providers/WalletsProvider";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
  weight: ["500", "700"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "800",
  display: "swap",
});
const backgroundImageStyle = {
  backgroundImage: `url(/backgrounds/map.svg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={backgroundImageStyle}
        className={`bg-dark-green ${baiJamjuree.variable} ${karla.variable} text-bright-yellow`}
      >
        <TRPCReactProvider headers={headers()}>
          <UIContextProvider>
            <Provider>
              <WalletsProvider>
                <main className="flex min-h-screen flex-wrap">
                  <Sidebar />
                  <div className="z-10 flex flex-grow flex-col">
                    <TopNav />
                    <div className="flex-grow">{props.children}</div>
                  </div>
                </main>
                <Footer />
              </WalletsProvider>
            </Provider>
          </UIContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

const title = "Home to the Adventurers";
const description =
  "Created for Adventurers by Bibliotheca DAO - your window into the onchain world of Realms and the Lootverse.";

export const metadata: Metadata = {
  title: {
    template: "%s | Realms.World",
    default: "Realms.World | Home to the Adventurers",
  },
  description: description,
  icons: {
    icon: "/rw-logo.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Realms.World |" + title,
    description: description,
    siteId: "1467726470533754880",
    creator: "@bibliothecadao",
    creatorId: "1467726470533754880",
    images: ["/backgrounds/map.png"],
  },
  openGraph: {
    title: "Realms.World |" + title,
    description: description,
    url: "https://realms.world",
    siteName: "Realms World",
    images: [
      {
        url: "/backgrounds/map.png",
        width: 800,
        height: 600,
      },
      {
        url: "/backgrounds/map.png",
        width: 1800,
        height: 1600,
        alt: "Realms Autonomous World",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
