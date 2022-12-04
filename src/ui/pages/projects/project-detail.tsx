import {
  Box,
  Container,
  VStack,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  Badge,
  Kbd,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import Carrousel from "../../components/carrousel";
import { useRouter } from "next/router";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { TechObj } from "../../../constants/technologies";
import { useHotkeys } from "react-hotkeys-hook";

import PROJECTS from "../../../data/projects.json";

type IProject = typeof PROJECTS[0];
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

  const prevProject = () => router.push(`/projects/${nextProjectSlug}`);
  const nextProject = () => router.push(`/projects/${prevProjectSlug}`);

  useHotkeys("ctrl + ArrowLeft", () => prevProject(), [prevProjectSlug]);
  useHotkeys("ctrl + ArrowRight", () => nextProject(), [nextProjectSlug]);

  return (
    <VStack spacing={6}>
      <Heading color="blue.400">{project.title}</Heading>
      <Box as="main" bg="gray.800" color="white">
        <Container maxW="xl" w="100%">
          <Stack p={10} gap={4} w="100%">
            <Box>
              <Carrousel
                slides={project.preview.urls}
                alt={project.preview.alt}
              />
            </Box>
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                Que es {project.title}?
              </Heading>
              <Text>{project.description}</Text>
            </Box>
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                Motivo
              </Heading>
              <Text>{project.reason}</Text>
            </Box>
            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                Caracteristicas
              </Heading>
              {project.features.map((paragraph, i) => (
                <Text key={i}>{paragraph}</Text>
              ))}
            </Box>
            <Box>
              <Heading fontSize="xl" mb={2} color="gray.500">
                Tecnologias utilizadas
              </Heading>
              <HStack mt={4}>
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
              </HStack>
            </Box>

            <Box>
              <Heading fontSize="xl" my={2} color="gray.500">
                Links
              </Heading>
              <Text>
                Cliente:{" "}
                <Link
                  as="a"
                  fontSize="md"
                  href={`//${project.source_client}`}
                  target="_blank"
                  color="blue.500"
                >
                  {project.source_client}
                </Link>
              </Text>
              {project.source_server && (
                <Text>
                  Codigo fuente:{" "}
                  <Link
                    as="a"
                    fontSize="md"
                    href={`//${project.source_server}`}
                    target="_blank"
                    color="blue.500"
                  >
                    {project.source_server}
                  </Link>
                </Text>
              )}
              <Text>
                Demo:{" "}
                <Link
                  as="a"
                  fontSize="md"
                  href={`//${project.demo}`}
                  target="_blank"
                  color="blue.500"
                >
                  {project.demo}
                </Link>
              </Text>
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
        &#10094; Prev Project
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
        Next Project &#10095;
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
