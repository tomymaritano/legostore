import { Box, Flex, Link, IconButton, Image, Icon } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import logo from "./assets/images/legologo.svg";
import CartWidget from "./CartWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";

library.add(faHeart);

const LegoNavBar = () => {
  return (
    <Flex
      bg="rgb(255, 207, 1)"
      color="black"
      py={4}
      px={8}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Image src={logo} h={10} />
      <Flex display={{ base: "none", md: "flex" }}>
        <Link to="/category/helmet" px={4} href="#">
          Helmet
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
      <Flex display={{ base: "none", md: "flex" }}>
        <Link px={4} href="#">
          <Icon as={SearchIcon} />
        </Link>
        <Link px={4} href="#">
          <FontAwesomeIcon icon="heart" />
        </Link>
        <Link px={4} href="#">
          <CartWidget />
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
