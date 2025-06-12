import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
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
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import "./CartBump.css";
import CartDrawer from "../Cart/CartDrawer";
import CartPopover from "../CartPopover/CartPopover";
import WishlistPopover from "../WishlistPopover/WishlistPopover"; // ✅ IMPORT

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscar:", searchQuery);
    setSearchQuery("");
  };

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

      {/* Icons + Search */}
      <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={4}>
        {/* Search inline */}
        <form onSubmit={handleSearch}>
          <InputGroup size="sm" w="200px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </form>

        {/* WishlistPopover → hover resumen */}
        <WishlistPopover /> {/* ✅ USO del WishlistPopover */}

        {/* CartPopover → hover resumen */}
        <CartPopover onOpenDrawer={onCartOpen} />

        {/* CartDrawer */}
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

              {/* Wishlist en mobile */}
              <Button
                variant="ghost"
                fontWeight="bold"
                as={NavLink}
                to="/wishlist"
                onClick={onMenuClose}
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