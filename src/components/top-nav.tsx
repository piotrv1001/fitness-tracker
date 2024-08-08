import MobileSidebar from "./sidebar/mobile-sidebar";
import UserButton from "./user-button";

export default function TopNav() {
  return (
    <nav className="fixed w-full z-50 flex justify-between py-2 px-4 bg-background border-b h-20">
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}
