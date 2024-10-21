import { PageLayout } from "../../../_components/PageLayout";
import React from "react";
import { BlogSidebar } from "./_components/Sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout>
      <div className="container mx-auto mt-8 flex-grow px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-grow">{children}</div>
          <aside className="w-full rounded-lg p-4 lg:w-1/2">
            <BlogSidebar />
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
