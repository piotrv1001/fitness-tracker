"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function GoogleLoginButton() {
  return (
    <Button
      variant="secondary"
      size="lg"
      type="submit"
      className="w-full flex justify-center gap-x-4"
    >
      <FcGoogle className="h-5 w-5" />
      <span>Google</span>
    </Button>
  );
}
