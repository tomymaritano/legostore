import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Box, Button, Heading, Stack, Text, Flex, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const slides = [
  {
    id: 1,
    image: "url(https://wallpapers.com/images/hd/red-lego-patterned-background-cvg8flewpb1brraz.jpg)",
    title: "Calling all dreamers",
    description:
      "Celebrate the launch of LEGO® DREAMZzz™ with our new competition.",
  },
  {
    id: 2,
    image: "url(https://wallpapers.com/images/featured/4k-lego-xbysab6aqzfvuug5.jpg)",
    title: "Skyline Collection",
    description: "Discover our stunning skyline sets for architecture lovers.",
  },
  {
    id: 3,
    image: "url( https://www.lego.com/cdn/cs/set/assets/blt4ca5ae84f874f9fc/01-Hero-Standard-TITAN.COMPAGE-Desktop.jpg?fit=crop&format=webply&quality=80&width=1600&height=500&dpr=1)",
    title: "Super Heroes Assemble",
    description: "Bring your favorite heroes to life with LEGO sets.",
  },
];
const MainSlider = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    mode: "free-snap", // para crossfade más fluido
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(timer);
  }, [instanceRef]);

  // Update current slide on change
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.on("slideChanged", (slider) => {
      setCurrentSlide(slider.track.details.rel);
    });
  }, [instanceRef]);

  return (
    <Box position="relative" overflow="hidden">
      {/* KeenSlider wrapper */}
      <Box ref={sliderRef} className="keen-slider">
        {slides.map((slide, idx) => (
          <Box
            key={slide.id}
            className={`keen-slider__slide ${currentSlide === idx ? "active" : ""}`}
            backgroundImage={slide.image}
            backgroundSize="cover"
            backgroundPosition="center"
            h={{ base: "400px", md: "500px", lg: "600px" }}
            display="flex"
            alignItems="center"
          >
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              bg="rgba(0,0,0,0.4)"
              backdropFilter="blur(4px)"
              borderRadius="md"
              p={{ base: 6, md: 10 }}
              m={{ base: 4, md: 16 }}
              maxW="lg"
              color="white"
            >
              <Stack spacing={4}>
                <Heading size="2xl">{slide.title}</Heading>
                <Text fontSize="md">{slide.description}</Text>
                <Button variant="outline" colorScheme="whiteAlpha">
                  Shop now
                </Button>
              </Stack>
            </MotionBox>
          </Box>
        ))}
      </Box>

      {/* Arrows → solo en desktop */}
      <IconButton
        display={{ base: "none", md: "block" }}
        icon={<ArrowBackIcon />}
        aria-label="Anterior"
        position="absolute"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        zIndex="999"
        bg="rgba(0,0,0,0.5)"
        color="white"
        _hover={{ bg: "rgba(0,0,0,0.7)" }}
        onClick={() => instanceRef.current?.prev()}
      />
      <IconButton
        display={{ base: "none", md: "block" }}
        icon={<ArrowForwardIcon />}
        aria-label="Siguiente"
        position="absolute"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        zIndex="999"
        bg="rgba(0,0,0,0.5)"
        color="white"
        _hover={{ bg: "rgba(0,0,0,0.7)" }}
        onClick={() => instanceRef.current?.next()}
      />

      {/* Dots */}
      <Flex
        justify="center"
        position="absolute"
        bottom="20px"
        w="100%"
        gap={2}
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            w="10px"
            h="10px"
            borderRadius="full"
            bg={currentSlide === idx ? "white" : "whiteAlpha.500"}
            cursor="pointer"
            onClick={() => instanceRef.current?.moveToIdx(idx)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default MainSlider;