import { Box, keyframes } from "@chakra-ui/react";

const beat = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const OnlineStatus = () => {
  return (
    <Box
      px="1.5"
      py="1.5"
      as="span"
      position="relative"
      bg="green.600"
      rounded="full"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "green.600",
        transform: "scale(1.2)",
        borderRadius: "full",
        animation: `${beat} 1.5s infinite`,
      }}
    />
  );
};

export default OnlineStatus;
