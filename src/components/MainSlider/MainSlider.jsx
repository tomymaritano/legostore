import {
  Container,
  Text,
  Image,
  Heading,
  Stack,
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

const MainSlider = () => {
  return (
    <Container
      display={"flex"}
      maxW={"100%"}
      maxH={"container.xl"}
      bgImage={
        "https://www.lego.com/cdn/cs/set/assets/blt4ca5ae84f874f9fc/01-Hero-Standard-TITAN.COMPAGE-Desktop.jpg?fit=crop&format=webply&quality=80&width=1600&height=500&dpr=1"
      }
      backgroundRepeat={"no-repeat"}
      backgroundPosition="center"
    >
      <Box m={"10%"} pl={20}>
        <Stack spacing={3}>
          <Heading color={"white"} as={"h1"} size={"2xl"} noOfLines={1}>
            Calling all dreamers
          </Heading>
        </Stack>
        <Stack spacing={3}>
          <Text color={"white"} fontSize="sm">
            To celebrate the launch of LEGO® DREAMZzz™, we’ve launched a
            competition for your child <br /> to become one of our Chief Dream
            Creators!
          </Text>
        </Stack>
        <Stack mt={5} spacing={3}>
          <ButtonGroup gap="1">
            <Button
              size={"md"}
              bgColor="white"
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
            >
              Learn more
            </Button>
            <Button
              size={"md"}
              bgColor="white"
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
            >
              Enter now
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Container>
  );
};

export default MainSlider;
