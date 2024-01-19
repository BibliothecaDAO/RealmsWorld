import type { Metadata } from "next";
import { Inconsolata, Silkscreen } from "next/font/google";
import Sidebar from "@/app/_components/SideMenu";

import { Provider } from "./providers/providers";

import "@realms-world/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { cache } from "react";
import { headers } from "next/headers";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";

import { Footer } from "./_components/Footer";
import { TopNav } from "./_components/TopNav";
import { UIContextProvider } from "./providers/UIProvider";
import { WalletsProvider } from "./providers/WalletsProvider";

const baiJamjuree = Silkscreen({
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
  weight: ["400"],
  display: "swap",
});

const karla = Inconsolata({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "400",
  display: "swap",
});

const backgroundImageStyle = {
  backgroundImage: `url(/backgrounds/map.svg)`,
  //backgroundSize: "cover",
  backgroundPosition: "top",
  backgroundRepeat: "repeat-y",
  backgroundOpacity: 0.1,
};

const getHeaders = cache(() => Promise.resolve(headers()));

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={backgroundImageStyle}
        className={`bg-dark-green ${baiJamjuree.variable} ${karla.variable} text-bright-yellow`}
      >
        <TRPCReactProvider headersPromise={getHeaders()}>
          <UIContextProvider>
            <Provider>
              <WalletsProvider>
                <main className="flex-wrap md:flex">
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
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://realms.world"
      : "http://localhost:3000",
  ),
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
    title: "Realms.World | " + title,
    description: description,
    siteId: "1467726470533754880",
    creator: "@bibliothecadao",
    creatorId: "1467726470533754880",
    images: ["/backgrounds/banner.png"],
  },
  openGraph: {
    title: "Realms.World |" + title,
    description: description,
    url: "https://realms.world",
    siteName: "Realms World",
    images: [
      {
        url: "/backgrounds/banner.png",
        width: 800,
        height: 600,
      },
      {
        url: "/backgrounds/banner.png",
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
