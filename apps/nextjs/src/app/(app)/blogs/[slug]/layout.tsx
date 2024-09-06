"use client";
import { PageLayout } from "../../../_components/PageLayout";
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <PageLayout>{children}</PageLayout>
  );
}
