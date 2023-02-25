import { Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="bg-black/30 w-full h-screen grid place-content-center">
      <Spinner thickness="4px" speed="0.65s" className="w-10 h-10" />
    </div>
  );
};

export default LoadingPage;
