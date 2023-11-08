export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="container mx-auto">
      <div className="bg-dark-green mt-12 border p-4"> {children}</div>
    </div>
  );
}
