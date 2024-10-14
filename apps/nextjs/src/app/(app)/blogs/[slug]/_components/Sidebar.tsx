import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  reader,
  sortPostsByPublishDate,
  CollectionEntry,
} from "@/utils/keystatic";
import BlogCard from "../../BlogCard";

export const BlogSidebar = () => {
  return (
    <div className="top-20 z-30 mb-5 flex w-full flex-col gap-8 py-5 lg:sticky lg:max-w-[380px] lg:flex-1">
      <h3 className="font-sans text-2xl">Recent Posts</h3>
      <RecentPosts postNumber={5} />
    </div>
  );
};

export default async function RecentPosts({
  postNumber,
}: {
  postNumber: number;
}) {
  const allPosts = await reader().collections.blogs.all();
  const recentPosts = sortPostsByPublishDate(allPosts).slice(0, postNumber);

  return (
    <div className="block">
      <div className="block-content !p-2">
        <div className="post-list flex flex-col gap-3">
          {recentPosts.map((post) => (
            <>
              <BlogCard
                horizontal
                key={post.t}
                blog={post.entry}
                slug={post.slug}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
