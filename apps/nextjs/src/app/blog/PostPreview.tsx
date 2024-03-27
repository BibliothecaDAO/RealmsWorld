import Image from "next/image";
import Link from "next/link";

import { BaseCard } from "../_components/BaseCard";
import { PostMetadata } from "./getArticles";

const PostPreview = (props: PostMetadata) => {
  return (
    <BaseCard>
      <Link href={`/blog/${props.slug}`} className="flex  flex-col ">
        <Image
          className="w-full rounded-l object-cover"
          src={props.image}
          width={500}
          height={500}
          alt={props.slug}
        />
        <div className="align-center p-4">
          <div>
            {" "}
            <div className="px-2 py-1 font-sans text-sm">{props.date}</div>
          </div>

          <h4>{props.title}</h4>
          <p>{props.subtitle}</p>
        </div>
      </Link>
    </BaseCard>
  );
};

export default PostPreview;
