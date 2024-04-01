import { Navbar } from "../navbar/navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
