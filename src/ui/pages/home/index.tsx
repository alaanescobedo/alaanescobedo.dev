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
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDocumentArrowDown } from "react-icons/hi2";
import NextLink from "next/link";
import { REDIRECTS } from "../../../constants";

import { getDayOfWeek } from "../../../utils/get-day-of-week";
import { TechObj } from "../../../constants/technologies";
import PROJECTS from "../../../data/projects.json";
import PdfModalViewer from "../../components/pdf-modal";

const STACK = [TechObj.typescript, TechObj.java];

const HomePage = () => {
  return (
    <VStack spacing={2}>
      <CallToActionWithAnnotation />
      <Projects />
    </VStack>
  );
};

export default HomePage;

const now = new Date();
const dayOfWeek = getDayOfWeek(
  now.getDate(),
  now.getMonth(),
  now.getFullYear()
);
function CallToActionWithAnnotation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          >
            <Text as="span">Hola! Feliz {dayOfWeek}!👋</Text>
            <Spacer />
            <Text as="span">Soy Alan Escobedo</Text>
          </Heading>

          <Heading
            as="h2"
            color={"gray.500"}
            textAlign="left"
            fontSize={{ base: "md", md: "xl" }}
          >
            Desarrollador Web 👨‍💻
            <Spacer my={4} />
            Construyendo{" "}
            <Text as="span" color="purple.400">
              un futuro mejor
            </Text>{" "}
            con la tecnología 🚀
          </Heading>

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
                Resume
              </Button>
            </ButtonGroup>
            <HStack pointerEvents="none">
              <Text>Programación:</Text>
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
              Projects
            </Text>
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mx="auto" w="full">
            {PROJECTS.map((project) => (
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

type IProject = typeof PROJECTS[0];

interface ProjectCardProps {
  project: IProject;
}
function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, demo, preview, slug, features, technologies } =
    project;
  return (
    <Card align="center" h="full">
      <CardHeader>
        <Heading size="md" color="purple.300">
          {title}
        </Heading>
      </CardHeader>
      <CardBody textAlign="left" py={1} flex={1}>
        {preview && (
          <Box border="2px" borderColor="blue.800" my={2}>
            <Image src={preview.urls[0]} alt={preview.alt} />
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
          >
            View Details
          </Button>
          <Button
            as="a"
            w="full"
            href={`//${demo}`}
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