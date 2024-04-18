"use client";

import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { setUser } from "@repo/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(setUser(session.data?.user))
  }, [session.data?.user]);

  return (
    <div>
      <Appbar
        onSignin={() => signIn()}
        onSignout={async () => {
          await signOut();
          router.push("api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
