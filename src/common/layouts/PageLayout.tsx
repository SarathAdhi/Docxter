import clsx from "clsx";
import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { Component } from "../types/component";

type Props = {
  title?: string;
};

const PageLayout: React.FC<Component & Props> = ({
  title,
  children,
  className,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center bg-slate-300">
        <Navbar />

        <div
          className={clsx(
            "max-w-full w-[1280px] flex-1 px-2 py-4 sm:p-5",
            className
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default PageLayout;
