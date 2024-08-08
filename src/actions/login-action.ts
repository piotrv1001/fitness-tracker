"use server";

import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/constants";

export const loginAction = async () => {
  await signIn("google", {
    callbackUrl: LOGIN_REDIRECT,
  });
};
