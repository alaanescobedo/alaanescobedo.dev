import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  AspectRatio,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function PdfModalViewer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { locale } = useRouter();
  const resumeFile = locale === "en" ? "Resume" : "CV";

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          m={0}
          py={6}
          bgColor="transparent"
          position="relative"
          h="full"
          w="full"
        >
          <ModalBody m="0 auto" p={0} w="full" h="full">
            <AspectRatio ratio={16 / 9} h="100%" w="100%">
              <iframe
                src={`/static/AlanEscobedo_${resumeFile}.pdf#view=fitH`}
                height="100%"
                width="100%"
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PdfModalViewer;
