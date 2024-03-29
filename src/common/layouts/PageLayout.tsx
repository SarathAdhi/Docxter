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
        <meta
          name="description"
          content="Docxter automatically combines templates with data to produce documents of extraordinary quality. Make templating easy."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen flex flex-col items-center bg-white">
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
