import { Provider } from "./providers/provider";
import "./globals.css";
import Sidebar from "./components/SideMenu";
import { TopNav } from "./components/TopNav";
import { Inconsolata, Karla } from "next/font/google";
import { Footer } from "./components/Footer";
import { UIContextProvider } from "./providers/UIProvider";

const inconsolata = Inconsolata({
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

export const metadata = {
  title: "Atlas - Home to the Adventurers",
  description: "Created for Adventurers by Bibliotheca DAO - your window into the onchain world of Realms and the Lootverse."
};

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
