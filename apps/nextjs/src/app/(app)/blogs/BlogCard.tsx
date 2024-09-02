import Image from "next/image";
import Link from "next/link";

import { Badge, Card } from "@realms-world/ui";
import type { CollectionEntry } from "@/utils/keystatic";


export const BlogCard = ({ blog, slug }: { blog: CollectionEntry<'blogs'>, slug: string }) => {
    return (
        <Card>
            <Link href={`/blogs/${slug}`} className="flex flex-col">
                <Image
                    className="min-h-[400px] w-full rounded-l object-cover"
                    src={`/content/blogs/${slug}/${blog.image}`}
                    width={500}
                    height={500}
                    alt={blog.title}
                />
                <div className="align-center p-4">
                    <Badge> <time dateTime={blog?.publishDate || ''}>
                        {new Date(blog?.publishDate || '').toLocaleDateString()}
                    </time></Badge>

                    <h4 className="my-4 text-2xl">{blog.title}</h4>
                    <p>{blog.subtitle}</p>
                </div>
            </Link>
        </Card>
    );
};

export default BlogCard;