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
  Button,
  Badge,
  Container,
} from "@chakra-ui/react";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/legologo.svg";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import CartDrawer from "../Cart/CartDrawer";
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
              <Link
                key={item.label}
                as={NavLink}
                to={item.path}
                position="relative"
                fontWeight="600"
                fontSize="sm"
                textTransform="uppercase"
                _after={{
                  content: "''",
                  position: "absolute",
                  bottom: "-2px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "2px",
                  bg: "black",
                  transition: "width 0.3s ease",
                }}
                _hover={{
                  _after: {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>

          {/* Icons + Search */}
          <Flex display="flex" alignItems="center" gap={4}>
            {/* Search */}
            <Box position="relative" display={{ base: "none", md: "block" }}>
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
                          placeholder="Buscar productos..."
                          borderRadius="full"
                          bg="gray.100"
                          _hover={{ bg: "gray.200" }}
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
            </Box>

            {/* Wishlist */}
            <Box position="relative">
              <IconButton
                icon={<FaHeart />}
                variant="ghost"
                size="md"
                as={NavLink}
                to="/wishlist"
                borderRadius="full"
                _hover={{ bg: "gray.100" }}
              />
              {totalWishlistQuantity > 0 && (
                <Badge
                  position="absolute"
                  top="0"
                  right="0"
                  bg="pink.500"
                  color="white"
                  borderRadius="full"
                  fontSize="10px"
                  px={1}
                >
                  {totalWishlistQuantity}
                </Badge>
              )}
            </Box>

            {/* Cart */}
            <Box position="relative">
              <IconButton
                icon={<FaShoppingCart />}
                variant="ghost"
                size="md"
                onClick={onCartOpen}
                borderRadius="full"
                _hover={{ bg: "gray.100" }}
              />
              {totalQuantity > 0 && (
                <Badge
                  position="absolute"
                  top="0"
                  right="0"
                  bg="teal.500"
                  color="white"
                  borderRadius="full"
                  fontSize="10px"
                  px={1}
                >
                  {totalQuantity}
                </Badge>
              )}
            </Box>

            {/* Mobile Menu */}
            <Box display={{ base: "block", md: "none" }}>
              <IconButton
                icon={<FaBars />}
                aria-label="Open Menu"
                variant="ghost"
                size="md"
                onClick={onMenuOpen}
              />
            </Box>
          </Flex>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onMenuClose} isOpen={isMenuOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack spacing={6} align="start">
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
                  fontWeight="bold"
                  fontSize="lg"
                  w="100%"
                  justifyContent="flex-start"
                >
                  {item.label}
                </Button>
              ))}
              <Divider />
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />
    </Box>
  );
};

export default NavBar;