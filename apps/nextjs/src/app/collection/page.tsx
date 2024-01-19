import CollectionsList from "./CollectionsList";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <>
      <div className=" w-full sm:pl-32 ">
        <div className="container mx-auto ">
          <h1 className="mb-8">Collections</h1>

          <hr className="my-8 border" />

          <CollectionsList />
        </div>
      </div>
    </>
  );
}
