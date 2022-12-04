import { Container, Text } from "@chakra-ui/react";

const UnderConstruction = () => {
  return (
    <Container
      bg="blue.800"
      p={[4, 20]}
      zIndex={10}
      maxWidth="container.md"
      textAlign="center"
      border="2px"
      borderColor="gray.600"
    >
      <Text color="purple.400" fontSize="2xl" fontWeight="bold">
        {" "}
        🏗 Sitio en construcción 🔨{" "}
      </Text>
    </Container>
  );
};

export default UnderConstruction;
