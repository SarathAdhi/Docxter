import { useFirebaseLogin } from "@/common/hooks/useFirebaseLogin";
import { useStore } from "@/utils/store";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { pages } from "./page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/backend/db";

const Navbar = () => {
  const { logout } = useStore();

  const [user] = useAuthState(auth);

  const { handleLogin } = useFirebaseLogin();

  return (
    <header className="p-3 w-full flex flex-col items-center bg-slate-200 border-b">
      <div className="max-w-full w-[1280px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/docxter.svg" className="w-44" />
        </Link>

        <div className="flex items-center gap-5 font-bold">
          {user &&
            pages.map((page) => (
              <Link href={page.href} key={page.name}>
                {page.name}
              </Link>
            ))}

          {user ? (
            <Button colorScheme="red" className="!font-bold" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button
              colorScheme="green"
              className="!font-bold"
              onClick={handleLogin}
              // isLoading={isLoading}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
