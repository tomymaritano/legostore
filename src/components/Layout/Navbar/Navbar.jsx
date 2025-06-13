import {
  Box,
  Flex,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Button,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/legologo.svg";
import { CartContext } from "../../CartContext/CartContext";
import CartDrawer from "../../Cart/CartDrawer";
import { getProducts } from "../../Service/asyncMock";
import { useDebounce } from "../../../hooks/useDebounce";
import NavSearchPopover from "./NavSearchPopover";
import NavLinkButton from "./NavLinkButton";
import WishlistPopover from "../../Popover/WishlistPopover/WishlistPopover";
import CartPopover from "../../Popover/CartPopover/CartPopover";

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

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      onSearchClose();
    }
  };

  const handleResultClick = () => {
    setTimeout(() => {
      setSearchQuery("");
      onSearchClose();
    }, 100);
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="999"
      bg="brand.300"
      boxShadow="lg"
      fontFamily="'Barlow', sans-serif"
    >
      <Container maxW="1200px" py={3} px={6}>
        <Flex justifyContent="space-between" alignItems="center">
          {/* Logo */}
          <Link as={NavLink} to="/" px={2}>
            <Image src={logo} h="40px" />
          </Link>

          {/* Menu Links Desktop */}
          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            gap={8}
            flex={1}
            justifyContent="center"
          >
            {[
              { label: "Helmet", path: "/category/helmet" },
              { label: "Brickheadz", path: "/category/brickheadz" },
              { label: "Cars", path: "/category/cars/sport" },
            ].map((item) => (
              <NavLinkButton key={item.label} to={item.path} label={item.label} />
            ))}
          </Flex>

          {/* Icons + Search */}
          <Flex display="flex" alignItems="center" gap={4}>
            <Box display={{ base: "none", md: "block" }}>
              <NavSearchPopover
                products={products}
                onSearch={(q) => {
                  navigate(`/search?q=${encodeURIComponent(q)}`);
                }}
              />
            </Box>
            <WishlistPopover />
            <CartPopover onOpenDrawer={onCartOpen} />
            <IconButton
              icon={<FaBars />}
              aria-label="Open Menu"
              variant="nav"
              size="md"
              display={{ base: "flex", md: "none" }}
              onClick={onMenuOpen}
            />
          </Flex>

          </Flex>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onMenuClose} isOpen={isMenuOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bg="brand.400">
          <DrawerCloseButton size="lg" top="1.5rem" right="1.5rem" />
          <DrawerBody pt={10} px={6}>
            {/* Header logo */}
            <Flex justifyContent="center" mb={8}>
              <Link as={NavLink} to="/" onClick={onMenuClose}>
                <Image src={logo} h="50px" />
              </Link>
            </Flex>

            {/* Menu items */}
            <VStack spacing={6} align="stretch" mb={10}>
              {[
                { label: "Helmet", path: "/category/helmet" },
                { label: "Brickheadz", path: "/category/brickheadz" },
                { label: "Cars", path: "/category/cars/sport" },
                { label: "Favoritos", path: "/wishlist" },
              ].map((item) => (
                <Button
                  key={item.label}
                  as={NavLink}
                  to={item.path}
                  onClick={onMenuClose}
                  variant="ghost"
                  size="lg"
                  fontSize="xl"
                  bg={'brand.300'}
                  justifyContent="flex-start"
                  borderColor={'white.100'}
                  w="100%"
                  py={6}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>

            {/* Footer - resumen */}
            <Box mt="auto" py={6}>
              <VStack spacing={4}>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
                  w="100%"
                  onClick={() => {
                    onMenuClose();
                    onCartOpen();
                  }}
                >
                  Ver Carrito ({totalQuantity})
                </Button>
                <Button
                  as={NavLink}
                  to="/wishlist"
                  variant="solid"
                  size="lg"
                  w="100%"
                  onClick={onMenuClose}
                >
                  Favoritos ({totalWishlistQuantity})
                </Button>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />
    </Box>
  );
};

export default NavBar;
