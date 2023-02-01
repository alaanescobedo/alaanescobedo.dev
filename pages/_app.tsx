import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Footer from "../src/ui/layouts/footer";
import { Box, VStack } from "@chakra-ui/react";
import Snowfall from "react-snowfall";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

const Layout = dynamic(() => import("../src/ui/layouts"), { ssr: false });
const Navbar = dynamic(() => import("../src/ui/layouts/navbar"), {
  ssr: false,
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Navbar />
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <Box py={[4, 6]} display="flex" flexDirection="column" flex={1}>
            <Snowfall snowflakeCount={100} />
            <Component {...pageProps} />
          </Box>
        </div>
      </SessionProvider>
      <Footer />
    </Layout>
  );
}

export default appWithTranslation(App);
