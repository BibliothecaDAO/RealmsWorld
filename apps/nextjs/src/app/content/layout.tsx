export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="bg-dark-green mx-auto mt-12 max-w-[80ch] space-y-6 border px-10 py-6 leading-relaxed">
      {children}
    </div>
  );
}
