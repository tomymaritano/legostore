import {
  Box,
  Text,
  Heading,
  Stack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

// motion wrapper para Box (Chakra + Framer)
const MotionBox = motion(Box);

const MainSlider = () => {
  return (
    <Box
      position="relative"
      w="100%"
      h={{ base: "400px", md: "500px", lg: "600px" }}
      bgImage={
        "url(https://www.lego.com/cdn/cs/set/assets/blt4ca5ae84f874f9fc/01-Hero-Standard-TITAN.COMPAGE-Desktop.jpg?fit=crop&format=webply&quality=80&width=1600&height=500&dpr=1)"
      }
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
    >
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        bg="rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(4px)"
        borderRadius="md"
        p={{ base: 6, md: 10 }}
        m={{ base: 4, md: 10 }}
        maxW="lg"
      >
        <Stack spacing={4}>
          <Heading color="white" as="h1" size="2xl" noOfLines={2}>
            Calling all dreamers
          </Heading>
          <Text color="white" fontSize="md">
            To celebrate the launch of LEGO® DREAMZzz™, we’ve launched a
            competition for your child to become one of our Chief Dream
            Creators!
          </Text>
          <ButtonGroup gap={3} mt={4}>
            <Button
              size="md"
              bgColor="white"
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
              _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
              transition="all 0.2s ease-in-out"
            >
              Learn more
            </Button>
            <Button
              size="md"
              bgColor="white"
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
              _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
              transition="all 0.2s ease-in-out"
            >
              Enter now
            </Button>
          </ButtonGroup>
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default MainSlider;