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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import "./CartBump.css";
import CartDrawer from "../Cart/CartDrawer";
import CartPopover from "../CartPopover/CartPopover";
import WishlistPopover from "../WishlistPopover/WishlistPopover";
import { getProducts } from "../Service/asyncMock";
import { useDebounce } from "../../hooks/useDebounce";

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

  // Manejo para evitar que el Popover se cierre al hacer click en un producto
  const handleResultClick = () => {
    setTimeout(() => {
      setSearchQuery("");
      onSearchClose();
    }, 100);
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
        {/* Search con Popover controlado */}
        <Popover
          isOpen={isSearchOpen && searchQuery.length >= 2}
          placement="bottom-start"
        >
          <PopoverTrigger>
            <Box>
              <form onSubmit={handleSearchSubmit}>
                <InputGroup size="sm" w="200px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Buscar (min 2 letras)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={onSearchOpen}
                    onBlur={() => {
                      setTimeout(() => {
                        if (searchQuery.trim() === "") {
                          onSearchClose();
                        }
                      }, 200);
                    }}
                  />
                </InputGroup>
              </form>
            </Box>
          </PopoverTrigger>
          <PopoverContent w="250px" maxH="300px" overflowY="auto" zIndex="popover">
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setSearchQuery("")} />
            <PopoverBody>
              {filteredProducts.length === 0 ? (
                <Text textAlign="center" py={2} color="gray.500">
                  No se encontraron productos.
                </Text>
              ) : (
                filteredProducts.slice(0, 5).map((prod) => (
                  <Box
                    key={prod.id}
                    as={NavLink}
                    to={`/item/${prod.id}`}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    py={2}
                    px={2}
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                    onClick={handleResultClick}
                  >
                    <Image
                      src={prod.img}
                      boxSize="40px"
                      objectFit="contain"
                      borderRadius="md"
                      bg="white"
                    />
                    <Box>
                      <Text fontWeight="medium" noOfLines={1}>
                        {prod.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        ${prod.price}
                      </Text>
                    </Box>
                  </Box>
                ))
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* WishlistPopover */}
        <WishlistPopover />

        {/* CartPopover */}
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

              {/* Mobile Drawer → CartDrawer */}
              <Button
                variant="solid"
                colorScheme="teal"
                fontWeight="bold"
                w="100%"
                onClick={() => {
                  onMenuClose();
                  onCartOpen();
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