import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-full flex justify-center items-center">
      <Link href="/auth/login">
        <Button size="lg">Login</Button>
      </Link>
    </div>
  );
}
