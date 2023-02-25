import { auth } from "@/backend/db";
import { useStore } from "@/utils/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const withAuth = (Component: React.FC) =>
  function pageProp({ ...pageProps }) {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const isAuth = !!user;

    useEffect(() => {
      if (!isAuth) {
        router.replace("/");
      }
    }, [user]);

    return <Component {...pageProps} />;
  };

withAuth.displayName = "withAuth";
export default withAuth;
