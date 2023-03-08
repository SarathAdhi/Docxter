import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/backend/db";
import LoadingPage from "@/common/components/LoadingPage";
import { useStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ignorePagesPath = ["/", "/help"];

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { getUserDocuments } = useStore();

  const ignorePage = ignorePagesPath.includes(router.asPath);

  function appLoadingFetchAction() {
    if (user) {
      localStorage.setItem("token", user.uid);
      getUserDocuments();
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!ignorePage) appLoadingFetchAction();
  }, [user, ignorePage]);

  if (!ignorePage && (loading || isLoading)) return <LoadingPage />;

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
