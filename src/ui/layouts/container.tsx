import { ReactNode } from "react";
import { Box, keyframes } from "@chakra-ui/react";

const twinkle = keyframes`
  0% {
    opacity: .10;
  }
  50% {
    opacity: .25;
  }
  100% {
    opacity: .10;
  }
`;

const sparkle = {
  content: '"*"',
  background: "rgb(98, 0, 255)",
  filter: "blur(100px)",
  position: "absolute",
  zIndex: "1",
  pointerEvents: "none",
  animation: `${twinkle} 3s linear infinite`,
};

export default function Container({ children }: { children: ReactNode }) {
  return (
    <Box
      bg="gray.900"
      minHeight="100vh"
      color="gray.200"
      _before={{
        ...sparkle,
        right: "100px",
        top: "150px",
        width: "300px",
        height: "300px",
      }}
      _after={{
        ...sparkle,
        left: "100px",
        bottom: "150px",
        width: "180px",
        height: "180px",
        animationDelay: ".6s",
      }}
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
}
