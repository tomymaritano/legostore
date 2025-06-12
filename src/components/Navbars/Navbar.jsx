import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
  Icon,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import "./CartBump.css"; // importa el css correctamente
import CartDrawer from "../Cart/CartDrawer";

library.add(faHeart);

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { totalQuantity, totalWishlistQuantity } = useContext(CartContext);
  const [bumpClass, setBumpClass] = useState("");
  const [bumpWishlistClass, setBumpWishlistClass] = useState("");

  // Animación bump para Cart
  useEffect(() => {
    if (totalQuantity === 0) return;
    setBumpClass("cart-bump");

    const timer = setTimeout(() => {
      setBumpClass("");
    }, 300);

    return () => clearTimeout(timer);
  }, [totalQuantity]);

  // Animación bump para Wishlist
  useEffect(() => {
    if (totalWishlistQuantity === 0) return;
    setBumpWishlistClass("cart-bump");

    const timer = setTimeout(() => {
      setBumpWishlistClass("");
    }, 300);

    return () => clearTimeout(timer);
  }, [totalWishlistQuantity]);

  return (
    <Flex
      as="nav"
      position="sticky"
      top="0"
      zIndex="999"
      bg="rgb(255, 207, 1)"
      color="black"
      py={3}
      px={4}
      justifyContent="space-between"
      alignItems="center"
      fontSize="sm"
      boxShadow="md"
    >
      {/* Logo */}
      <Link as={NavLink} to="/" px={2}>
        <Image src={logo} h={10} />
      </Link>

      {/* Menu Links Desktop */}
      <Flex
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        gap={6}
        flex={1}
        justifyContent="center"
      >
        <Link
          textTransform="uppercase"
          fontWeight="bold"
          as={NavLink}
          to="/category/helmet"
        >
          Helmet
        </Link>
        <Link
          textTransform="uppercase"
          fontWeight="bold"
          as={NavLink}
          to="/category/brickheadz"
        >
          Brickheadz
        </Link>
        {/* Dropdown Menu */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Cars
          </MenuButton>
          <MenuList>
            <MenuItem as={NavLink} to="/category/cars/sport" onClick={onClose}>
              Sport Cars
            </MenuItem>
            <MenuItem as={NavLink} to="/category/cars/classic" onClick={onClose}>
              Classic Cars
            </MenuItem>
            <MenuItem as={NavLink} to="/category/cars/suv" onClick={onClose}>
              SUV
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Icons */}
      <Flex
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        gap={4}
      >
        <Link as={NavLink} to="/search" position="relative">
          <Icon as={SearchIcon} boxSize={5} />
        </Link>

        <Link as={NavLink} to="/wishlist" position="relative">
          <FontAwesomeIcon icon="heart" size="lg" />
          {totalWishlistQuantity > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-2"
              fontSize="0.7em"
              px={1.5}
              className={bumpWishlistClass}
            >
              {totalWishlistQuantity}
            </Badge>
          )}
        </Link>

<CartDrawer />
      </Flex>

      {/* Mobile Menu Icon */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={<FaBars />}
          aria-label="Open Menu"
          variant="ghost"
          size="md"
          onClick={onOpen}
        />
      </Box>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack spacing={4} align="start">
              <Link
                as={NavLink}
                to="/category/helmet"
                fontWeight="bold"
                onClick={onClose}
              >
                Helmet
              </Link>
              <Link
                as={NavLink}
                to="/category/brickheadz"
                fontWeight="bold"
                onClick={onClose}
              >
                Brickheadz
              </Link>
              {/* Subitems in Drawer */}
              <Box>
                <Box fontWeight="bold" mb={1}>
                  Cars
                </Box>
                <VStack align="start" pl={4}>
                  <Link
                    as={NavLink}
                    to="/category/cars/sport"
                    onClick={onClose}
                  >
                    Sport Cars
                  </Link>
                  <Link
                    as={NavLink}
                    to="/category/cars/classic"
                    onClick={onClose}
                  >
                    Classic Cars
                  </Link>
                  <Link as={NavLink} to="/category/cars/suv" onClick={onClose}>
                    SUV
                  </Link>
                </VStack>
              </Box>

              <Link as={NavLink} to="/search" onClick={onClose}>
                Search
              </Link>
              <Link as={NavLink} to="/wishlist" onClick={onClose}>
                Wishlist ({totalWishlistQuantity})
              </Link>
              <Link as={NavLink} to="/cart" onClick={onClose}>
                Cart ({totalQuantity})
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;