import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mx-auto flex h-screen w-full flex-wrap justify-center px-4 sm:px-10">
      <Image
        src="/pink_crown.gif"
        className="self-center"
        alt="logo"
        width={100}
        height={100}
      />

    </div>
  );
}
