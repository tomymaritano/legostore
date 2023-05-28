import { Box, Flex, Link, IconButton, Image, Icon } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import CartWidget from "../CartWidget/CartWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";

library.add(faHeart);

const NavBar = () => {
  return (
    <Flex
      bg="rgb(255, 207, 1)"
      color="black"
      py={3}
      px={1}
      justifyContent="space-evenly"
      alignItems="center"
      fontSize={"sm"}
    >
      <Link as={NavLink} to="/" px={4}>
        <Image src={logo} h={10} />
      </Link>
      <Flex display={{ base: "none", md: "flex" }}>
        <Link textTransform="uppercase" fontWeight="bold" as={NavLink} to="/category/helmet" px={4} href="#">
          Helmet
        </Link>
        <Link textTransform="uppercase" fontWeight="bold" as={NavLink} to="/category/brickheadz" px={4} href="#">
          Brickheadz
        </Link>
        <Link textTransform="uppercase" fontWeight="bold" as={NavLink} to="/category/cars" px={4} href="#">
          Cars
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
      </Flex>
      <IconButton
        icon={<FaBars />}
        aria-label="Open Menu"
        display={{ base: "block", md: "none" }}
      />
    </Flex>
  );
  1;
};

export default NavBar;
