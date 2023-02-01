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
import { useTranslation } from "react-i18next";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}
function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  const { t } = useTranslation("auth", { keyPrefix: "login" });

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
          {t("heading")}
        </Heading>
        <ModalBody pt={8}>
          <VStack spacing={4}>
            <Button onClick={() => signIn("google")} leftIcon={<FcGoogle />}>
              {t("actions.google")}
            </Button>
            <Button onClick={() => signIn("github")} leftIcon={<FaGithub />}>
              {t("actions.github")}
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Tooltip label={t("why.content")} aria-label="A tooltip">
            <Text color={"gray.300"} fontWeight={"bold"} fontSize={"sm"}>
              {t("why.title")}
            </Text>
          </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalLogin;
