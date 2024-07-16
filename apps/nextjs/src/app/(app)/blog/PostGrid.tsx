import { getSortedArticlesData } from "./getArticles";
import PostPreview from "./PostPreview";

function getData() {
  return {
    articles: getSortedArticlesData(),
  };
}

const PostGrid = () => {
  const { articles } = getData();

  const postPreviews = articles.map((post, index) => (
    <PostPreview key={index} {...post} />
  ));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">{postPreviews}</div>
  );
};

export default PostGrid;
