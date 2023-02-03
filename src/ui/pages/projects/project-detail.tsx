import {
  Box,
  Container,
  VStack,
  Text,
  Stack,
  Heading,
  Icon,
  Badge,
  Kbd,
  useBreakpointValue,
  Link,
  Flex,
} from "@chakra-ui/react";
import Carrousel from "../../components/carrousel";
import { useRouter } from "next/router";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { TechObj } from "../../../constants/technologies";
import { useHotkeys } from "react-hotkeys-hook";

import PROJECTS from "../../../../public/locales/en/projects.json";
import NextImage from "next/image";
import { useTranslation } from "react-i18next";

type IProject = typeof PROJECTS.data[0];
interface ProjectDetailProps {
  project: IProject;
  nextProjectSlug: string;
  prevProjectSlug: string;
}

const arrowStyles = {
  cursor: "pointer",
  top: "50%",
  w: "auto",
  mt: "-22px",
  px: "16px",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  _hover: {
    bg: "black",
    backdropFilter: "opacity(0.5)",
    color: "blue.400",
  },
};

const ProjectDetails = ({
  project,
  nextProjectSlug,
  prevProjectSlug,
}: ProjectDetailProps) => {
  const router = useRouter();
  const displayArrow = useBreakpointValue({ lg: "flex", base: "none" });
  const { t } = useTranslation("projects");

  const prevProject = () => router.push(`/projects/${nextProjectSlug}`);
  const nextProject = () => router.push(`/projects/${prevProjectSlug}`);

  useHotkeys("ctrl + ArrowLeft", () => prevProject(), [prevProjectSlug]);
  useHotkeys("ctrl + ArrowRight", () => nextProject(), [nextProjectSlug]);

  return (
    <VStack spacing={6}>
      <Heading color="blue.400" position="relative">
        <Box position="absolute" top="-1px" left="-6px" w={[5, 6]}>
          <NextImage
            src="/static/santa_hat.svg"
            width={100}
            height={100}
            alt="123"
          />
        </Box>
        {project.title}
        {project.inProgress && (
          <Badge ml={2} colorScheme="yellow">
            {t("status.in_progress")}
          </Badge>
        )}
      </Heading>
      <Box as="main" bg="gray.800" color="white">
        <Container maxW="xl" w="100%">
          <Stack p={10} gap={4} w="100%">
            {project.preview && (
              <Box>
                <Carrousel
                  slides={project.preview?.urls}
                  alt={project.preview.alt}
                />
              </Box>
            )}
            {!project.preview && (
              <Box
                border="2px"
                borderColor="blue.800"
                my={2}
                textAlign="center"
              >
                <Text fontSize="md" color="gray.300">
                  {t("status.no_preview")}
                </Text>
              </Box>
            )}
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                {t("sections.what_is", { appName: project.title })}
              </Heading>
              <Text>{project.description}</Text>
            </Box>
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                {t("sections.reason")}
              </Heading>
              <Text>{project.reason}</Text>
            </Box>
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                {t("sections.features")}
              </Heading>
              {project.features.map((paragraph, i) => (
                <Text key={i}>{paragraph}</Text>
              ))}
            </Box>
            <Box>
              <Heading fontSize="xl" mb={2} color="gray.500">
                {t("sections.technologies")}
              </Heading>
              <Flex mt={4} gap={1} flexWrap={"wrap"}>
                {project.technologies.map((tech, i) => {
                  const { icon, color, name } =
                    TechObj[tech as keyof typeof TechObj];

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
            </Box>

            <Box gap="2">
              <Heading fontSize="xl" my={2} color="gray.500">
                {t("sections.links")}
              </Heading>
              {project.links.map((link, i) => (
                <Box key={i}>
                  {link.label}:{" "}
                  <Link
                    as={link?.disabled ? Text : "a"}
                    display="inline-flex"
                    my={1}
                    variant={link?.disabled ? "disabled" : ""}
                    fontSize="md"
                    href={`//${link.url}`}
                    target="_blank"
                    color={link?.disabled ? "gray.500" : "blue.500"}
                  >
                    {link.url}
                  </Link>
                </Box>
              ))}
              <Box>
                Demo:{" "}
                <Link
                  as={project.demo === null ? Text : "a"}
                  display="inline-flex"
                  my={1}
                  variant={project.demo === null ? "disabled" : ""}
                  fontSize="md"
                  href={`//${project.demo}`}
                  target="_blank"
                  color={project.demo === null ? "gray.500" : "blue.500"}
                >
                  {project.demo === null ? "En desarrollo" : project.demo}
                </Link>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Text
        left="6%"
        onClick={prevProject}
        colorScheme="red"
        pos="fixed"
        userSelect="none"
        display={displayArrow}
        {...arrowStyles}
      >
        &#10094; {t("sections.prev_project")}
      </Text>
      <Text
        right="6%"
        onClick={nextProject}
        colorScheme="red"
        pos="fixed"
        userSelect="none"
        display={displayArrow}
        {...arrowStyles}
      >
        {t("sections.next_project")} &#10095;
      </Text>
      <Box pos="fixed" right="5%" top="10%" display={displayArrow}>
        <VStack color="gray.500" fontSize="lg" opacity="0.7" spacing={4}>
          <Text>
            Prev: <Kbd>ctrl</Kbd> +{" "}
            <Kbd>
              <Icon as={ArrowBackIcon} />
            </Kbd>
          </Text>
          <Text>
            Next: <Kbd>ctrl</Kbd> +{" "}
            <Kbd>
              <Icon as={ArrowForwardIcon} />
            </Kbd>
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default ProjectDetails;
