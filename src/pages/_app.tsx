import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/backend/db";
import LoadingPage from "@/common/components/LoadingPage";
import { useStore } from "@/utils/store";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserDocuments } = useStore();

  async function appLoadingFetchAction() {
    await getUserDocuments();
    setIsLoading(false);
  }

  useEffect(() => {
    appLoadingFetchAction();
  }, []);

  if (loading || isLoading) return <LoadingPage />;

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}