export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="mx-auto max-w-4xl">
      <div className="bg-dark-green mx-2 mt-20 space-y-6 overflow-y-auto text-ellipsis border px-6 py-6 leading-relaxed sm:px-10 [&>*]:list-inside [&>*]:list-disc">
        {children}
      </div>
    </div>
  );
}
