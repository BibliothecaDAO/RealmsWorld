import Image from "next/image";
import Link from "next/link";

import { Badge, Card } from "@realms-world/ui";

import type { PostMetadata } from "./getArticles";

const PostPreview = (props: PostMetadata) => {
  return (
    <Card>
      <Link href={`/blog/${props.slug}`} className="flex flex-col">
        <Image
          className="min-h-[400px] w-full rounded-l object-cover"
          src={props.image}
          width={500}
          height={500}
          alt={props.slug}
        />
        <div className="align-center p-4">
          <Badge> {props.date}</Badge>

          <h4 className="my-4 text-2xl">{props.title}</h4>
          <p>{props.subtitle}</p>
        </div>
      </Link>
    </Card>
  );
};

export default PostPreview;
