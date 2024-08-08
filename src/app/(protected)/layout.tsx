import Sidebar from "@/components/sidebar/sidebar";
import TopNav from "@/components/top-nav";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full overflow-hidden bg-secondary">
      <TopNav />
      <div className="hidden md:flex flex-col fixed inset-y-0 pt-20 w-72 bg-background border-r">
        <Sidebar />
      </div>
      <div className="pt-20 md:pl-72 h-full">
        <div className="h-full overflow-y-auto p-4 bg-background">
          <div className="w-full max-w-[1246px] mx-auto h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
