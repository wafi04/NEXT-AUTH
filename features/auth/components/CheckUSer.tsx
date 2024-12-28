"use client";
import { logout } from "@/app/(auth)/auth/action";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/user-data";

export default function CheckUser() {
  const data = useCurrentUser();

  return (
    <div>
      {data?.name}
      <Button onClick={() => logout()}>LOGOUT</Button>
    </div>
  );
}
