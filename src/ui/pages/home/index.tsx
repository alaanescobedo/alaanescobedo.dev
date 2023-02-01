import {
  VStack,
  Box,
  Container,
  Button,
  Heading,
  Stack,
  Text,
  ButtonGroup,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Spacer,
  Icon,
  Flex,
  Badge,
  Image,
  useDisclosure,
  List,
  ListIcon,
  ListItem,
  Link,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
  FaGithubAlt,
} from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { HiDocumentArrowDown } from "react-icons/hi2";
import NextLink from "next/link";
import { REDIRECTS } from "../../../constants";

import GitPrStatusBadge from "../../components/git-pr-status-badge";

import { getDayOfWeek } from "../../../utils/get-day-of-week";
import { TechObj } from "../../../constants/technologies";
import PROJECTS from "../../../../public/locales/es/projects.json";
import PdfModalViewer from "../../components/pdf-modal";

import Head from "next/head";
import NextImage from "next/image";
import { useSession } from "next-auth/react";
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const STACK = [TechObj.typescript, TechObj.java];

const HomePage = () => {
  return (
    <>
      <Head>
        <title>alaanescobedo.dev</title>
        <meta
          name="description"
          content="Personal website of Alan Escobedo, Frontend Developer, based in Mexico"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack spacing={2}>
        <CallToActionWithAnnotation />
        <Projects />
        <ContributionsOpenSource />
        <GoalsForNextYear />
      </VStack>
    </>
  );
};

export default HomePage;

const now = new Date();

function CallToActionWithAnnotation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("home");
  const { locale, defaultLocale } = useRouter();

  const dayOfWeek = getDayOfWeek(
    now.getDate(),
    now.getMonth(),
    now.getFullYear(),
    locale ?? defaultLocale ?? "en"
  );

  const { data: session, status } = useSession();
  const formatedName = session?.user?.name?.split(" ")[0] ?? null;

  return (
    <>
      <Container
        maxW={"3xl"}
        py={3}
        scrollBehavior={"smooth"}
        scrollMarginTop={"96"}
        as="section"
        id="section-about"
      >
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
            color={"blue.400"}
            position="relative"
          >
            <Text as="span" position="relative">
              <Box position="absolute" top="-2px" left="-10px" w={[5, 8]}>
                <NextImage
                  src="/static/santa_hat.svg"
                  width={100}
                  height={100}
                  alt="123"
                />
              </Box>
              {t("greeting", {
                name: formatedName && ` ${formatedName}`,
                dayOfWeek,
              })}
            </Text>
            <Spacer />
            <Text as="span">{t("i_am")}</Text>
          </Heading>

          <VStack alignItems={"start"} textAlign={"left"}>
            <Heading
              as="h2"
              color={"gray.500"}
              fontSize={{ base: "md", md: "xl" }}
              m={"0"}
            >
              {t("i_am_a")}
            </Heading>
            <Heading
              as="h2"
              color={"gray.500"}
              fontSize={{ base: "md", md: "xl" }}
              m={"0"}
            >
              <Trans t={t} i18nKey={"what_i_do"}>
                <Text as="span" color="purple.400">
                  better future
                </Text>
              </Trans>
            </Heading>
          </VStack>

          <Flex justifyContent="space-between" flexWrap="wrap" gap={6}>
            <ButtonGroup gap={3} justifyContent="center">
              <Button
                as={NextLink}
                href={REDIRECTS.GITHUB}
                target="_blank"
                variant="link"
                leftIcon={<FaGithub />}
              >
                Github
              </Button>
              <Button
                as={NextLink}
                href={REDIRECTS.LINKEDIN}
                target="_blank"
                variant="link"
                leftIcon={<FaLinkedin />}
              >
                Linkedin
              </Button>
              <Button
                onClick={onOpen}
                variant="link"
                leftIcon={<HiDocumentArrowDown />}
              >
                {t("resume")}
              </Button>
            </ButtonGroup>
            <HStack pointerEvents="none">
              <Text>{t("programming_label")}:</Text>
              <Flex gap={2}>
                {STACK.map(({ name, color, icon }, i) => (
                  <Badge
                    bgColor="whiteAlpha.400"
                    color="whiteAlpha.800"
                    alignItems="center"
                    display="flex"
                    gap={1}
                    key={i}
                  >
                    {name}
                    <Icon as={icon} color={color} />
                  </Badge>
                ))}
              </Flex>
              <PdfModalViewer isOpen={isOpen} onClose={onClose} />
            </HStack>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

function Projects() {
  const { t } = useTranslation("projects");
  const projectsData: any[] = t("data", { returnObjects: true });

  return (
    <Box
      as="section"
      bg="gray.800"
      color="white"
      id="section-projects"
      scrollMarginTop={["150px", "100px"]}
    >
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 4, md: 8 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={"blue.400"}>
              {t("heading")}
            </Text>
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mx="auto" w="full">
            {projectsData
              .slice(0)
              .reverse()
              .map((project) => (
                <GridItem colSpan={[2, 1]} key={project.id}>
                  <ProjectCard project={project} />
                </GridItem>
              ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

type IProject = typeof PROJECTS.data[0];

interface ProjectCardProps {
  project: IProject;
}
function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation("projects");
  const { locale } = useRouter();

  const { title, description, preview, slug, technologies, demo, inProgress } =
    project;
  return (
    <Card align="center" h="full">
      <CardHeader>
        <Heading size="md" color="purple.300">
          {title}
          {inProgress! && (
            <Badge ml={2} colorScheme="yellow">
              {t("status.in_progress")}
            </Badge>
          )}
        </Heading>
      </CardHeader>
      <CardBody
        textAlign="left"
        py={1}
        flex={1}
        display="flex"
        flexDirection="column"
      >
        {preview && (
          <Box border="2px" borderColor="blue.800" my={2}>
            <Image src={preview.urls[0]} alt={preview.alt} />
          </Box>
        )}
        {!preview && (
          <Box
            border="2px"
            borderColor="blue.800"
            my={2}
            textAlign="center"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            maxHeight="158px"
            flex={1}
          >
            <Text fontSize="md" color="gray.300" flex={1}>
              {t("no_preview")}
            </Text>
          </Box>
        )}
        <Box>
          <Text fontSize="md" color="gray.300">
            {description}
          </Text>
        </Box>
      </CardBody>
      <CardFooter flexDirection="column" gap={5} w="full">
        <Flex gap={2} flexWrap="wrap">
          {technologies.map((tech, i) => {
            const { name, icon, color } = TechObj[tech as keyof typeof TechObj];
            return (
              <Badge
                bgColor="whiteAlpha.400"
                color="whiteAlpha.800"
                alignItems="center"
                display="flex"
                gap={1}
                key={i}
              >
                {name}
                <Icon as={icon} color={color} />
              </Badge>
            );
          })}
        </Flex>
        <Flex justifyContent="space-between" gap={4}>
          <Button
            as={NextLink}
            w="full"
            href={`/projects/${slug}`}
            colorScheme="purple"
            bgColor="purple.500"
            color="white"
            locale={locale}
          >
            {t("actions.details")}
          </Button>
          <Button
            as={demo === null ? Button : "a"}
            w="full"
            href={`//${demo}`}
            disabled={demo === null}
            target="_blank"
            colorScheme="blue"
            bgColor="blue.500"
            color="white"
          >
            Demo
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}

function GoalsForNextYear() {
  const { t } = useTranslation("goals");
  const goalsData: any[] = t("data.2023", { returnObjects: true });

  return (
    <Box as={"section"} py={"6"}>
      <Container maxW={"2xl"}>
        <Stack>
          <Heading textAlign={"center"}>
            <Text as={"span"} color={"blue.400"}>
              {t("heading")}
            </Text>
          </Heading>
          <Heading as={"h3"} size={"sm"} color={"gray.500"}>
            {t("description")}
          </Heading>
          <List spacing={3} py={"4"}>
            {goalsData.map((goal, i) => (
              <ListItem display="flex" alignItems={"center"} key={i}>
                <ListIcon as={MdOutlinePending} color="blue.500" />
                {goal.text}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Container>
    </Box>
  );
}

function ContributionsOpenSource() {
  const { t } = useTranslation("contributions");
  const contributionsData: any[] = t("data", { returnObjects: true });

  return (
    <Box as={"section"} py={"6"}>
      <Container maxW={"3xl"}>
        <Heading as="h2" size="lg" color="blue.400" textAlign={"center"}>
          {t("heading")}
          <Icon as={FaGithubAlt} mx={"6px"} />
        </Heading>
        <Box pt={6} gap={0}>
          {contributionsData.map((contribution, i) => {
            return (
              <Grid
                templateColumns="repeat(12, 1fr)"
                gap={2}
                w={"full"}
                borderBottom={"1px"}
                borderTop={i === 0 ? "1px" : "0"}
                borderColor={"gray.700"}
                alignItems={"center"}
                py={"6px"}
                key={i}
              >
                <GridItem
                  colStart={1}
                  colEnd={[5, 4, 3]}
                  display="flex"
                  alignItems={"center"}
                >
                  <Link
                    fontSize={["sm"]}
                    fontWeight={"semibold"}
                    bg={"gray.700"}
                    p={"4px"}
                    rounded={"md"}
                    w="full"
                    textAlign={"center"}
                    href={contribution.repo_url}
                    isExternal
                  >
                    {contribution.repo_name}
                  </Link>
                </GridItem>
                <GridItem
                  colStart={[1, 4, 3]}
                  colEnd={[5, 6, 5]}
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <GitPrStatusBadge status={contribution.status} />
                </GridItem>
                <GridItem
                  colStart={[5, 6, 5]}
                  colEnd={13}
                  rowStart={1}
                  rowEnd={[3, "auto"]}
                >
                  <Link href={contribution.pr_url} isExternal>
                    {contribution.description}
                    <Icon as={FaExternalLinkAlt} mx={"6px"} />
                  </Link>
                </GridItem>
              </Grid>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
