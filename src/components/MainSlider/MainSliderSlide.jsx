import { Box, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MainSliderSlide = ({ slide, className }) => (
  <Box
    className={className}
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
);

export default MainSliderSlide;
