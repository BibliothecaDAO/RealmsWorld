import { BlogCard } from "./BlogCard";
import { reader } from "@/utils/keystatic";

export const BlogGrid = async () => {
    const blogs = await reader.collections.blogs.all();


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog.entry} slug={blog.slug} />
            ))}
        </div>
    );
};
