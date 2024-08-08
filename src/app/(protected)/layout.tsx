import TopNav from "@/components/top-nav";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full overflow-hidden">
      <TopNav />
      <main className="h-full overflow-y-auto">{children}</main>
    </div>
  );
}
