import { PageLayout } from "../_components/PageLayout";
import CollectionsList from "./CollectionsList";

export const metadata = {
  title: "Realms Collections",
  description:
    "Various collections of the Realms Autonomous  World - Created for adventurers by Bibliotheca DAO",
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
