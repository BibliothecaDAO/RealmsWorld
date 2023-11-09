export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="max-w-screen">
      <div className="bg-dark-green mx-auto mt-12 max-w-[80ch] space-y-6 break-words border px-10 py-6 leading-relaxed [&>*]:list-inside [&>*]:list-disc">
        {children}
      </div>
    </div>
  );
}
