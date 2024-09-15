import type { Metadata } from "next";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
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

import { getArticleData } from "../getArticles";

async function getData({ id }: { id: string }) {
  return {
    article: await getArticleData(id),
  };
}
interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { article } = await getData({ id: params.slug });

  return {
    title: `${article.title}`,
    description: `${article.subtitle} - Created for Adventurers by Bibliotheca DAO`,
    openGraph: {
      title: `${article.subtitle} - Created for Adventurers by Bibliotheca DAO`,
      images: [
        {
          url: article.image,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title}`,
      description: `${article.subtitle} - Created for Adventurers by Bibliotheca DAO`,
      siteId: "1467726470533754880",
      creator: "@bibliothecadao",
      creatorId: "1467726470533754880",
      images: [article.image],
    },
  };
}

export default async function Article({ params: { slug } }: ArticlePageProps) {
  const { article } = await getData({ id: slug });

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
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="my-12 text-left">
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="mt-2 text-xl">{article.subtitle}</p>
          <div className="mt-8 text-xl font-bold">
            <span>Posted on </span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString()}
            </time>
            <span> by </span>
            <span>{article.author}</span>
          </div>
        </div>
        <Image
          alt={article.title}
          src={article.image as string | StaticImport}
          width={900}
          className="w-full object-cover"
          height={600}
        />
        <article className="prose prose-lg mx-auto mt-6 max-w-5xl px-6 pb-6 text-xl prose-headings:text-bright-yellow prose-p:font-thin prose-li:text-bright-yellow prose-p:text-bright-yellow prose-a:text-flamingo prose-strong:text-bright-yellow prose-ul:text-bright-yellow md:mt-12">
          <div
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            className="article-container"
          />
        </article>

        <hr />
        <div className="container mx-auto px-10">
          <div className="mt-6">
            <Button variant={"outline"} asChild>
              <Link href={"/blog"}>back</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
