import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaShoppingBag, FaShoppingBasket } from "react-icons/fa";
import cart from "../assets/images/shopping-cart-outline.svg";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import CartWidget from "../CartWidget/CartWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";

library.add(faHeart);

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
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
        <Link
          textTransform="uppercase"
          fontWeight="bold"
          as={NavLink}
          to="/category/helmet"
          px={4}
          href="#"
        >
          Helmet
        </Link>
        <Link
          textTransform="uppercase"
          fontWeight="bold"
          as={NavLink}
          to="/category/brickheadz"
          px={4}
          href="#"
        >
          Brickheadz
        </Link>
        <Link
          textTransform="uppercase"
          fontWeight="bold"
          as={NavLink}
          to="/category/cars"
          px={4}
          href="#"
        >
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
        <Link px={4} href="/cart">
          <Icon as={FaShoppingBag} />
          <CartWidget />
        </Link>
      </Flex>
      <IconButton
        icon={<FaBars />}
        aria-label="Open Menu"
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        ref={btnRef}
      />
    </Flex>
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <VStack align="start" spacing={4}>
            <Link as={NavLink} to="/category/helmet" onClick={onClose} textTransform="uppercase" fontWeight="bold">Helmet</Link>
            <Link as={NavLink} to="/category/brickheadz" onClick={onClose} textTransform="uppercase" fontWeight="bold">Brickheadz</Link>
            <Link as={NavLink} to="/category/cars" onClick={onClose} textTransform="uppercase" fontWeight="bold">Cars</Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default NavBar;
