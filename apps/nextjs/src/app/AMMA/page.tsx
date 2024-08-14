
import { PageLayout } from "../_components/PageLayout";
import NewTemplate from '../_components/game-template/NewTemplate';

export const metadata = {
  title: "AMMA Event",
  description:
    "AMMA - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <PageLayout>
      <NewTemplate />
    </PageLayout>
  )
}
