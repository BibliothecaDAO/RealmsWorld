import { getSortedArticlesData } from "./getArticles";
import PostPreview from "./PostPreview";

async function getData() {
  return {
    articles: getSortedArticlesData(),
  };
}

const PostGrid = async () => {
  const { articles } = await getData();

  console.log(articles);
  const postPreviews = articles.map((post, index) => (
    <PostPreview key={index} {...post} />
  ));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">{postPreviews}</div>
  );
};

export default PostGrid;
