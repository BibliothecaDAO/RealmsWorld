import { Provider } from "./providers/provider";
import "./globals.css";
import Sidebar from "./components/SideMenu";
import { TopNav } from "./components/TopNav";
import { Space_Grotesk, Karla } from "next/font/google";
import { Footer } from "./components/Footer";
import { UIContextProvider } from "./providers/UIProvider";

const inconsolata = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap"
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "800",
  display: "swap"
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-theme-gray ${inconsolata.variable} ${karla.variable} text-white/80`}>
        <UIContextProvider>
          <Provider>
            <main className="flex flex-wrap min-h-screen">
              <Sidebar />
              <div className="z-10 flex flex-col flex-grow">
                <TopNav />
                <div className="flex-grow overflow-y-auto">{children}</div>
              </div>
            </main>
          </Provider>
        </UIContextProvider>
        <Footer />
      </body>
    </html>
  );
}


const title = "Atlas - Home to the Adventurers";
const description = "Created for Adventurers by Bibliotheca DAO - your window into the onchain world of Realms and the Lootverse.";


export const metadata = {
  title: title,
  description: description,
  icons: {
    icon: '/vercel.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    siteId: '1467726470533754880',
    creator: '@bibliothecadao',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'],
  },
  openGraph: {
    title: title,
    description: description,
    url: 'https://atlas.bibliothecadao.xyz',
    siteName: 'Atlas',
    images: [
      {
        url: '/map.png',
        width: 800,
        height: 600,
      },
      {
        url: '/map.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
