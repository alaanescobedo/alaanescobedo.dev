import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Footer from "../src/ui/layouts/footer";
import { Box, VStack } from "@chakra-ui/react";

const Layout = dynamic(() => import("../src/ui/layouts"), { ssr: false });
const Navbar = dynamic(() => import("../src/ui/layouts/navbar"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      <Box py={[4, 6]} display="flex" flexDirection="column" flex={1}>
        <Component {...pageProps} />
      </Box>
      <Footer />
    </Layout>
  );
}
