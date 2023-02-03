import { Box, Grid, GridItem } from "@chakra-ui/layout";
import {
  Link,
  Text,
  HStack,
  Container,
  Flex,
  Badge,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ModalLogin from "../components/modal-login";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("navbar");
  const LINKS: any[] = t("menu", { returnObjects: true });

  return (
    <HStack
      spacing={[3, 4]}
      alignItems="center"
      h="full"
      justify="space-evenly"
    >
      {LINKS.map(({ title, path, disabled, tag }) => (
        <Link
          as={disabled ? Text : NextLink}
          href={path}
          variant={disabled ? "disabled" : "link"}
          key={path}
          fontSize="lg"
          fontWeight="semibold"
          position="relative"
          locale={locale}
        >
          {title}
          {disabled && (
            <Badge
              fontSize="3xs"
              top="10%"
              position="absolute"
              colorScheme="blue"
            >
              {tag}
            </Badge>
          )}
        </Link>
      ))}
    </HStack>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("navbar");
  const { status } = useSession();
  const {
    locale: initialLocale,
    locales,
    push,
    pathname,
    query,
    asPath,
  } = useRouter();
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
        align={"center"}
      >
        <Container maxW={"full"} display={"flex"} alignItems={"center"}>
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
                    <Link
                      as={NextLink}
                      href="/"
                      fontSize="md"
                      locale={initialLocale}
                    >
                      {t("home.title")}
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
                        {t("auth.login.title")}
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
          <Box m={0}>
            <Select
              variant="outline"
              borderColor="purple.600"
              onChange={(e) =>
                push(
                  {
                    pathname,
                    query,
                  },
                  asPath,
                  { locale: e.target.value }
                )
              }
              color="white"
              value={initialLocale}
              textTransform={"uppercase"}
            >
              {locales?.map((locale) => (
                <option
                  key={locale}
                  value={locale}
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  {locale}
                </option>
              ))}
            </Select>
          </Box>
        </Container>
      </Flex>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </>
  );
}
