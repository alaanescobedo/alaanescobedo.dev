import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  AspectRatio,
} from "@chakra-ui/react";

function PdfModalViewer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
                src="/static/AlanEscobedo_CV.pdf#view=fitH"
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
