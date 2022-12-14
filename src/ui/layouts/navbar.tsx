import { Grid, GridItem } from "@chakra-ui/layout";
import {
  Link,
  Text,
  HStack,
  Container,
  Flex,
  Badge,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ModalLogin from "../components/modal-login";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const LINKS = [
  {
    path: "/projects",
    title: "Projects",
  },
  {
    path: "/blog",
    title: "Blog",
    disabled: true,
  },
];

const Menu = () => {
  return (
    <HStack
      spacing={[3, 4]}
      alignItems="center"
      h="full"
      justify="space-evenly"
    >
      {LINKS.map(({ title, path, disabled }) => (
        <Link
          as={disabled ? Text : NextLink}
          href={path}
          variant={disabled ? "disabled" : ""}
          key={path}
          fontSize="lg"
          fontWeight="semibold"
          position="relative"
        >
          {title}
          {disabled && (
            <Badge
              fontSize="3xs"
              top="10%"
              position="absolute"
              colorScheme="blue"
            >
              Soon
            </Badge>
          )}
        </Link>
      ))}
    </HStack>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useSession();

  return (
    <>
      <Flex
        bg="gray.800"
        as="nav"
        borderTopWidth={3}
        borderBottomWidth={3}
        borderColor="purple.600"
        position="sticky"
        w="100%"
        top="0"
        zIndex={10}
        borderBottomRadius="md"
        borderTopColor="purple.700"
        borderBottomColor="purple.900"
      >
        <Container maxW={"3xl"}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            py={4}
            flexDir={["column", "column", "row"]}
            gridGap={[4, 4, 0]}
          >
            <Grid templateColumns="repeat(6, 1fr)" gap={6} mx="auto" w="full">
              <GridItem w="100%" h="10" colSpan={[2, 1]} order={[1, 1]}>
                <HStack alignItems="center" h="full">
                  <Link as={NextLink} href="/" fontSize="md">
                    Home
                  </Link>
                </HStack>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={[4, 2]} order={[2, 3]}>
                <HStack alignItems="center" h="full" justifyContent="end">
                  {status === "authenticated" && (
                    <Button
                      p={"4"}
                      variant={"link"}
                      onClick={() => signOut()}
                      _hover={{ color: "purple.400" }}
                    >
                      Logout
                    </Button>
                  )}
                  {status === "unauthenticated" && (
                    <Button
                      p={"4"}
                      variant={"link"}
                      onClick={onOpen}
                      _hover={{ color: "purple.400" }}
                    >
                      Login
                    </Button>
                  )}
                </HStack>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={[6, 3]} order={[3, 2]}>
                <Menu />
              </GridItem>
            </Grid>
          </HStack>
        </Container>
      </Flex>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </>
  );
}
