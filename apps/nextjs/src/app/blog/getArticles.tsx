import fs from "fs";
import path from "path";
import matter from "gray-matter";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { remark } from "remark";
import html from "remark-html";

export interface PostMetadata {
  title: string;
  date: string;
  subtitle: string;
  slug: string;
  image: string;
}

export default async function markdownToHtml(markdown: any) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const articlesDirectory = path.join(process.cwd(), "src/app/blog/content");

export function getSortedArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName): PostMetadata => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: id,
      title: data.title,
      date: data.date,
      image: data.image,
      subtitle: data.subtitle,
    };
  });

  return allArticlesData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getArticleData(id: any) {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await markdownToHtml(content);

  return {
    id,
    contentHtml: processedContent,
    title: data.title,
    date: data.date,
    image: data.image,
    subtitle: data.subtitle,
  };
}
