import CollectionsList from "./CollectionsList";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <>
      <div className="mask-transparent h-96 w-full before:bg-[url(/backgrounds/map.png)] before:bg-cover before:bg-center before:bg-no-repeat" />
      <div className="-mt-24 w-full">
        <div className="container mx-auto px-8 ">
          <h1>Collections</h1>
          <CollectionsList />
        </div>
      </div>
    </>
  );
}
