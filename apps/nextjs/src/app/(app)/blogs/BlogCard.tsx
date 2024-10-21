import Image from "next/image";
import Link from "next/link";
import { Badge } from "@realms-world/ui/components/ui/badge";
import { Card } from "@realms-world/ui/components/ui/card";
import type { CollectionEntry } from "@/utils/keystatic";
import { cn } from "@realms-world/utils";

export const BlogCard = ({
  blog,
  slug,
  horizontal,
}: {
  blog: CollectionEntry<"blogs">;
  slug: string;
  horizontal?: boolean;
}) => {
  return (
    <Card>
      <Link
        href={`/blogs/${slug}`}
        className={cn(!horizontal && "flex-col", "flex")}
      >
        <Image
          className={cn(
            horizontal ? "w-[110px]" : "min-h-[400px] w-full",
            "rounded-l object-cover",
          )}
          src={`/content/blogs/${slug}/${blog.previewImage ?? blog.image}`}
          width={500}
          height={500}
          alt={blog.title}
        />
        <div
          className={cn(horizontal && "flex", "align-center items-center p-4")}
        >
          {!horizontal && (
            <Badge>
              <time dateTime={blog?.publishDate || ""}>
                {new Date(blog?.publishDate || "").toLocaleDateString()}
              </time>
            </Badge>
          )}

          <h4 className={cn(!horizontal && "my-4 text-2xl")}>{blog.title}</h4>
          {!horizontal && <p>{blog.subtitle}</p>}
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard;
