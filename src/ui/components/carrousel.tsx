import { Flex, Text, Box, Image, AspectRatio } from "@chakra-ui/react";
import { useState } from "react";

// const slides = [
//   {
//     img: "https://res.cloudinary.com/dr3egho5s/image/upload/v1670003472/generations-maps_umfjm3.jpg",
//   },
//   {
//     img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//   },
//   {
//     img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//   },
//   {
//     img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//   },
// ];

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
    opacity: 0.8,
    bg: "black",
  },
};

const Carrousel = ({ slides, alt }: { slides: string[]; alt: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slidesCount - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slidesCount - 1 ? 0 : current + 1
    );
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
    <Flex w="full" overflow="hidden" pos="relative">
      <Flex w="full" {...carouselStyle}>
        {slides.map((slide, id) => (
          <Box key={id} boxSize="full" shadow="md" flex="none">
            <AspectRatio ratio={16 / 9}>
              <Image src={slide} alt={`${alt} ${id + 1}`} key={id} />
            </AspectRatio>
          </Box>
        ))}
      </Flex>
      <Text
        left="0"
        onClick={prevSlide}
        pos="absolute"
        userSelect="none"
        {...arrowStyles}
      >
        &#10094;
      </Text>
      <Text
        right="0"
        onClick={nextSlide}
        pos="absolute"
        userSelect="none"
        {...arrowStyles}
      >
        &#10095;
      </Text>
    </Flex>
  );
};

export default Carrousel;
