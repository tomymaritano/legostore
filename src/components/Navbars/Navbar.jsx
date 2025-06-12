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
  Divider,
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
import "./CartBump.css";
import CartDrawer from "../Cart/CartDrawer";
import CartPopover from "../CartPopover/CartPopover";

library.add(faHeart);

const NavBar = () => {
  const { totalQuantity, totalWishlistQuantity } = useContext(CartContext);

  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const [bumpWishlistClass, setBumpWishlistClass] = useState("");

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
        <Link textTransform="uppercase" fontWeight="bold" as={NavLink} to="/category/helmet">
          Helmet
        </Link>
        <Link textTransform="uppercase" fontWeight="bold" as={NavLink} to="/category/brickheadz">
          Brickheadz
        </Link>
        {/* Dropdown Menu */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost" fontWeight="bold" textTransform="uppercase">
            Cars
          </MenuButton>
          <MenuList>
            <MenuItem as={NavLink} to="/category/cars/sport" onClick={onMenuClose}>
              Sport Cars
            </MenuItem>
            <MenuItem as={NavLink} to="/category/cars/classic" onClick={onMenuClose}>
              Classic Cars
            </MenuItem>
            <MenuItem as={NavLink} to="/category/cars/suv" onClick={onMenuClose}>
              SUV
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Icons */}
      <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={4}>
        {/* Search */}
        <Box position="relative">
          <IconButton
            as={NavLink}
            to="/search"
            aria-label="Buscar"
            icon={<SearchIcon />}
            variant="ghost"
            size="md"
          />
        </Box>

        {/* Wishlist */}
        <Box position="relative">
          <IconButton
            as={NavLink}
            to="/wishlist"
            aria-label="Favoritos"
            icon={<FontAwesomeIcon icon="heart" />}
            variant="ghost"
            size="md"
          />
          {totalWishlistQuantity > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              px={1.5}
              className={bumpWishlistClass}
            >
              {totalWishlistQuantity}
            </Badge>
          )}
        </Box>

        {/* CartPopover → hover resumen → Ver carrito abre Drawer */}
        <CartPopover onOpenDrawer={onCartOpen} />

        {/* CartDrawer → Drawer controlado por isCartOpen / onCartClose */}
        <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />
      </Flex>

      {/* Mobile Menu Icon */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton icon={<FaBars />} aria-label="Open Menu" variant="ghost" size="md" onClick={onMenuOpen} />
      </Box>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onMenuClose} isOpen={isMenuOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack spacing={4} align="start">
              <Button variant="ghost" fontWeight="bold" as={NavLink} to="/category/helmet" onClick={onMenuClose}>
                Helmet
              </Button>
              <Button variant="ghost" fontWeight="bold" as={NavLink} to="/category/brickheadz" onClick={onMenuClose}>
                Brickheadz
              </Button>
              {/* Subitems in Drawer */}
              <Box w="100%">
                <Box fontWeight="bold" mb={1}>
                  Cars
                </Box>
                <VStack align="start" pl={4}>
                  <Button variant="ghost" as={NavLink} to="/category/cars/sport" onClick={onMenuClose}>
                    Sport Cars
                  </Button>
                  <Button variant="ghost" as={NavLink} to="/category/cars/classic" onClick={onMenuClose}>
                    Classic Cars
                  </Button>
                  <Button variant="ghost" as={NavLink} to="/category/cars/suv" onClick={onMenuClose}>
                    SUV
                  </Button>
                </VStack>
              </Box>

              <Divider my={2} />

              {/* Search en mobile */}
              <Button
                variant="ghost"
                fontWeight="bold"
                as={NavLink}
                to="/search"
                onClick={onMenuClose}
                leftIcon={<SearchIcon />}
              >
                Buscar
              </Button>

              {/* Wishlist en mobile */}
              <Button
                variant="ghost"
                fontWeight="bold"
                as={NavLink}
                to="/wishlist"
                onClick={onMenuClose}
                leftIcon={<FontAwesomeIcon icon="heart" />}
              >
                Favoritos {totalWishlistQuantity > 0 && `(${totalWishlistQuantity})`}
              </Button>

              <Divider my={2} />

              {/* Mobile Drawer → Botón que abre el mismo CartDrawer */}
              <Button
                variant="solid"
                colorScheme="teal"
                fontWeight="bold"
                w="100%"
                onClick={() => {
                  onMenuClose(); // cerrar Mobile Drawer
                  onCartOpen(); // abrir CartDrawer
                }}
              >
                Ver Carrito ({totalQuantity})
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;