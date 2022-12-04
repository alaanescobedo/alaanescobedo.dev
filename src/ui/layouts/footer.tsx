import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import NextLink from "next/link";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box bg="gray.800" as="footer">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          Made with ❤️ by Alan Escobedo |
          <Link
            as={NextLink}
            isExternal
            href="https://nextjs.org"
            color="whiteAlpha.800"
            ml={1}
          >
            Next.js
          </Link>{" "}
          +
          <Link
            as={NextLink}
            isExternal
            href="https://typescriptlang.org"
            color="blue.300"
            ml={1}
          >
            TypeScript
          </Link>{" "}
          +
          <Link
            as={NextLink}
            isExternal
            href="https://chakra-ui.com"
            color="green.300"
            ml={1}
          >
            Chakra UI
          </Link>{" "}
          | Arigato!
        </Text>
      </Container>
    </Box>
  );
}
