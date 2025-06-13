import {
  Flex,
  Link,
  Button,
  Divider,
  Center,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ArrowBackIcon } from "@chakra-ui/icons";

library.add(faHeart);

const ExtraNavbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      bg="white"
      color="black"
      py={3}
      px={{ base: 4, md: 8 }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems="center"
      direction={{ base: "column", md: "row" }}
      gap={{ base: 2, md: 0 }}
      textAlign={{ base: "center", md: "left" }}
    >
      {/* Left: Play Zone button */}
      <Button
        as={NavLink}
        to="/play-zone"
        leftIcon={<ArrowBackIcon />}
        size="xs"
        bg="#ABD9FF"
        borderRadius="md"
        fontSize="xs"
        _hover={{ bg: "#90C9FF" }}
        aria-label="Go to Play Zone"
        w={isMobile ? "100%" : "auto"}
      >
        Play Zone
      </Button>

      {/* Center: Gift message */}
      <Flex
        w={isMobile ? "100%" : "auto"}
        justifyContent="center"
      >
        <Text fontSize="xs" maxW="full">
          A gift with LEGO® purchases of 850 kr. or more{" "}
          <Link
            as={NavLink}
            to="/shop"
            color="blue.600"
            textDecoration="underline"
            fontWeight="medium"
            _hover={{ color: "blue.800" }}
          >
            Shop now
          </Link>
        </Text>
      </Flex>

      {/* Right: Account / VIP */}
      <Flex
        alignItems="center"
        justifyContent={isMobile ? "center" : "flex-end"}
        w={isMobile ? "100%" : "auto"}
      >
        <Button
          as={NavLink}
          to="/account"
          size="xs"
          fontSize="xs"
          bg="transparent"
          _hover={{ bg: "gray.100" }}
          aria-label="Account"
        >
          Account
        </Button>
        <Center height="20px">
          <Divider orientation="vertical" mx={2} />
        </Center>
        <Button
          as={NavLink}
          to="/vip"
          size="xs"
          fontSize="xs"
          bg="transparent"
          _hover={{ bg: "gray.100" }}
          aria-label="VIP"
        >
          VIP
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExtraNavbar;