import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
} from "@realms-world/ui";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { reader } from "@/utils/keystatic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  let blog = await reader.collections.blogs.read(params.id);

  return {
    title: `${blog?.title}`,
    description: `${blog?.subtitle} - Created for Adventurers by Bibliotheca DAO`,
    openGraph: {
      title: `${blog?.title} - Created for Adventurers by Bibliotheca DAO`,
      images: [
        {
          url: `/content/blogs/${params.id}/${blog?.image}`,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog?.title}`,
      description: `${blog?.subtitle} - Created for Adventurers by Bibliotheca DAO`,
      siteId: "1467726470533754880",
      creator: "@bibliothecadao",
      creatorId: "1467726470533754880",
      images: [`/content/blogs/${params.id}/${blog?.image}`],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await reader.collections.blogs.read(params.slug);
  if (!blog) {
    return <div>No Blog Found</div>;
  }
  const { node } = await blog.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node);

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs">Blog</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="my-12 text-left">
          <h1 className="text-4xl font-bold">{blog?.title}</h1>
          <p className="mt-2 text-xl">{blog?.subtitle}</p>
          <div className="mt-8 text-xl font-bold">
            <span>Posted on </span>
            <time dateTime={blog?.publishDate || ''}>
              {new Date(blog?.publishDate || '').toLocaleDateString()}
            </time>
            <span> by </span>
            <span>{blog?.author}</span>
          </div>
        </div>
        <Image
          alt={blog?.title}
          src={`/content/blogs/${params.id}/${blog?.image}`}
          width={900}
          className="w-full object-cover"
          height={600}
        />
        <article className="prose prose-lg mx-auto mt-6 max-w-5xl px-6 pb-6 text-xl prose-headings:text-bright-yellow prose-p:font-thin prose-p:text-bright-yellow prose-a:text-flamingo prose-strong:text-bright-yellow prose-ul:text-bright-yellow prose-ol:text-bright-yellow md:mt-12">
          <div className="article-container">
            {Markdoc.renderers.react(renderable, React)}
          </div>
        </article>

        <hr />
        <div className="container mx-auto px-10">
          <div className="mt-6">
            <Button variant={"outline"} asChild>
              <Link href={"/blogs"}>back</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}



export async function generateStaticParams() {
  const blogSlugs = await reader.collections.blogs.list()
  return blogSlugs.map((blogSlug) => ({ slug: blogSlug }))
}