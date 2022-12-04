import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Image,
  Icon,
  VStack,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

import dynamic from "next/dynamic";

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
          <ModalCloseButton
            zIndex={100}
            display="block"
            bgColor="blue.400"
            borderRadius="full"
          />
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
