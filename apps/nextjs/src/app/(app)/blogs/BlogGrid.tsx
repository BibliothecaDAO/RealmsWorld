import { BlogCard } from "./BlogCard";
import { reader } from "@/utils/keystatic";

export const BlogGrid = async () => {
    const blogs = await reader.collections.blogs.all();
    const blogsSortedByDate = blogs.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b?.entry.publishDate) - new Date(a?.entry.publishDate);
    });


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {blogsSortedByDate.map((blog, index) => (
                <BlogCard key={index} blog={blog.entry} slug={blog.slug} />
            ))}
        </div>
    );
};
