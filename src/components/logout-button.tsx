"use client";

import { logoutAction } from "@/actions/logout-action";

type LogoutButtonProps = {
  children?: React.ReactNode;
};

export default function LogoutButton({ children }: LogoutButtonProps) {

  const onClick = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}