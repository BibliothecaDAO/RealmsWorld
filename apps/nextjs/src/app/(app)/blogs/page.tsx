import type { Metadata } from "next";

import { PageLayout } from "../../_components/PageLayout";
import { BlogGrid } from "./BlogGrid";

export const metadata: Metadata = {
    title: "Realms World Blog",
    description:
        "Latest news from Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
    return (
        <PageLayout title="Realms World Blog">
            <BlogGrid />
        </PageLayout>
    );
}