import { Box, Flex, Link, IconButton, Image } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import logo from "./assets/images/legologo.svg"

const LegoNavBar = () => {
  return (
    <Flex
      bg="rgb(255, 207, 1)"
      color="black"
      py={4}
      px={8}
      justifyContent="space-between"
      alignItems="center"
    >
        <Image src={logo} h={10} />
      <Flex display={{ base: "none", md: "flex" }}>
        <Link px={4} href="#">
          Sets
        </Link>
        <Link px={4} href="#">
          Minifigures
        </Link>
        <Link px={4} href="#">
          Bricks & Pieces
        </Link>
        <Link px={4} href="#">
          Accessories
        </Link>
        <Link px={4} href="#">
          Sale
        </Link>
      </Flex>
      <IconButton
        icon={<FaBars />}
        aria-label="Open Menu"
        display={{ base: "block", md: "none" }}
      />
    </Flex>
  );
};

export default LegoNavBar;
