import { Navbar } from "@/components/Public/Navbar/navbar";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar renders on Home, Resources, Events, Contacts, Login, Register */}
     <Navbar/>
      {/* Main content of whichever child page is active */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}