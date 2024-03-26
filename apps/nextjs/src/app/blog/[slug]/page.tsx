// import {
//   FrameButton,
//   FrameContainer,
//   FrameImage,
//   FrameInput,
//   FrameReducer,
//   NextServerPageProps,
//   getFrameMessage,
//   getPreviousFrame,
//   useFramesReducer,
// } from "frames.js/next/server";

import { Button } from "@realms-world/ui";

import { getArticleData } from "../getArticles";

async function getData({ id }: any) {
  return {
    article: await getArticleData(id),
  };
}
interface ArticlePageProps {
  params: {
    slug: string;
  };
}
export default async function Article({ params: { slug } }: ArticlePageProps) {
  const { article } = await getData({ id: slug });

  return (
    <>
      <div>
        <div className="my-12 text-center">
          <h1 className="text-2xl ">{article.title}</h1>
          <p className="mt-2">{article.date}</p>
        </div>
        <article className="prose prose-lg mx-auto mt-6 max-w-5xl px-6 pb-6 text-xl md:mt-12">
          <div
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            className="article-container leading-loose"
          />
          <div className="mt-6">
            <Button variant={"outline"} href={"/blog"}>
              back
            </Button>
          </div>
        </article>
      </div>
    </>
  );
}
