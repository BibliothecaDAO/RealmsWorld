export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="w-full h-full">
      <div className="bg-cover bg-center w-full bg-no-repeat h-96 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(32,32,32,1)),url('/dummy_background.png')] -mt-32" />
      {children}
    </div>
  );
}
