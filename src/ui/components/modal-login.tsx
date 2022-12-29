import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Icon,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Tooltip } from "@chakra-ui/react";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}
function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgGradient="linear(to-br, gray.800, purple.900 )"
        alignSelf={"center"}
        w={"sm"}
        borderRadius={"xl"}
        boxShadow={"xl"}
        p={4}
        py={8}
      >
        <ModalCloseButton />
        <Heading as={"h4"} size={"md"} textAlign={"center"} color={"gray.100"}>
          Iniciar sesión
        </Heading>
        <ModalBody pt={8}>
          <VStack spacing={4}>
            <Button onClick={() => signIn("google")} leftIcon={<FcGoogle />}>
              Acceder con Google
            </Button>
            <Button onClick={() => signIn("github")} leftIcon={<FaGithub />}>
              Acceder con Github
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Tooltip
            label={
              "De momento no hay una razón para iniciar sesión, una amiga quería que la saludara cuando ingresara a la página, aun así, tengo planes a futuro para nuevas features que implementen esta función."
            }
            aria-label="A tooltip"
          >
            <Text color={"gray.300"} fontWeight={"bold"} fontSize={"sm"}>
              ¿Porque iniciar sesión?
            </Text>
          </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalLogin;
