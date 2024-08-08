import UserButton from "./user-button";

export default function TopNav() {
  return (
    <nav className="fixed w-full z-50 flex justify-end py-2 px-4 bg-secondary">
      <UserButton />
    </nav>
  );
}
