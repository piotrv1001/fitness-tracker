"use client";

import GoogleLoginButton from "./google-login-button";
import { loginAction } from "@/actions/login-action";

export default function GoogleLoginForm() {
  return (
    <form
      className="w-full"
      action={loginAction}
    >
      <GoogleLoginButton />
    </form>
  );
}
