import { PageLayout } from "../_components/PageLayout";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <PageLayout title="Realms World Blog">{children}</PageLayout>
    // <div className="container mx-auto max-w-4xl">
    //   <div className="[p>a]:text-flamingo mx-2 mt-20 space-y-6 overflow-y-auto text-ellipsis border bg-dark-green px-6 py-6 leading-relaxed sm:px-10 [&>*]:list-inside [&>*]:list-disc">
    //     {children}
    //   </div>
    // </div>
  );
}

// export const metadata = {
//   title: "Blogpost: Loot Survivor Immutable Arcade + The Golden Token mint",
//   openGraph: {
//     title: "Blogpost: Loot Survivor Immutable Arcade + The Golden Token mint",
//     images: [
//       {
//         url: "/blog/loot-survivor/LS_article_meta_data_image.png",
//         width: 800,
//         height: 600,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Realms.World | Loot Survivor Blogpost",
//     description:
//       "Blogpost: Loot Survivor Immutable Arcade + The Golden Token mint",
//     siteId: "1467726470533754880",
//     creator: "@bibliothecadao",
//     creatorId: "1467726470533754880",
//     images: ["/blog/loot-survivor/LS_article_meta_data_image.png"],
//   },
// };
