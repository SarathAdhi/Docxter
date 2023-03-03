import { useFirebaseLogin } from "@/common/hooks/useFirebaseLogin";
import { useStore } from "@/utils/store";
import Link from "next/link";
import React from "react";
import { pages } from "./page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/backend/db";
import clsx from "clsx";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

const Navbar = () => {
  const { logout } = useStore();

  const [user] = useAuthState(auth);

  const { handleLogin } = useFirebaseLogin();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = ({ className = "" }) => (
    <div className={clsx("flex items-center gap-5 font-bold", className)}>
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
  );

  return (
    <>
      <header className="p-3 w-full flex flex-col items-center bg-slate-200 border-b">
        <div className="max-w-full w-[1280px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={100}
              height={100}
              src="/docxter.svg"
              className="w-28 sm:w-44"
              alt="Docxter Logo"
            />
          </Link>

          <NavLinks className="hidden sm:flex" />

          <button className="!block sm:!hidden" onClick={onOpen}>
            <Image
              src="/assets/menu-burger.svg"
              width={20}
              height={20}
              alt="Menu"
            />
          </button>
        </div>
      </header>

      <Drawer
        onEsc={onClose}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>DOCXTER</DrawerHeader>

          <DrawerBody mt={5}>
            <NavLinks className="flex-col text-xl" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
