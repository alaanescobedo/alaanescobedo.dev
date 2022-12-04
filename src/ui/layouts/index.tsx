import { ReactNode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { buttonTheme, tabsTheme, linkTheme } from "./config/theme";

import Container from "./container";

const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Tabs: tabsTheme,
    Link: linkTheme,
  },
});

function Layout({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Container>{children}</Container>
    </ChakraProvider>
  );
}

export default Layout;
