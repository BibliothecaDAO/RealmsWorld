import { PageLayout } from "../_components/PageLayout";
import CollectionsList from "./CollectionsList";

export const metadata = {
  title: "Lootverse Collections",
  description:
    "Various collections of the Lootverse - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <>
      <PageLayout title="Collections">
        <CollectionsList />
      </PageLayout>
    </>
  );
}
