import { BlogCard } from "./BlogCard";
import { reader } from "@/utils/keystatic";

export const BlogGrid = async () => {
  const blogs = await reader().collections.blogs.all();
  const blogsSortedByDate = blogs.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b?.entry.publishDate) - new Date(a?.entry.publishDate);
  });

  return (
    <div className="sm:p4-4 grid grid-cols-1 gap-4 px-8 md:grid-cols-3">
      {blogsSortedByDate.map((blog, index) => (
        <BlogCard key={index} blog={blog.entry} slug={blog.slug} />
      ))}
    </div>
  );
};
