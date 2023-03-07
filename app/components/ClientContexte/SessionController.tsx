import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SessionController({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/login", { forceOptimisticNavigation: true });
  }
  return <>{children}</>;
}
