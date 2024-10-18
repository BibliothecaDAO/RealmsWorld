import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-wrap p-4 sm:p-8">{children}</div>;
}
