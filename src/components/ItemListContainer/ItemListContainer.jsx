import {
  Container,
  Heading,
  Spinner,
  Center,
  Text,
  Box,
  Flex,
  Select,
  Image,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "../Service/asyncMock";
import ProductList from "../ProductList/ProductList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const MotionBox = motion(Box);

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recommended");

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer filtros mobile

  const parseFiltersFromParams = () => {
    return {
      type: searchParams.getAll("type"),
      age: searchParams.getAll("age"),
      theme: searchParams.getAll("theme"),
      interests: searchParams.getAll("interests"),
      pieces: searchParams.getAll("pieces"),
      highlight: searchParams.getAll("highlight"),
    };
  };

  const [filters, setFilters] = useState(parseFiltersFromParams);

  useEffect(() => {
    setFilters(parseFiltersFromParams());
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((val) => params.append(key, val));
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    if (filters.type.length > 0 && !filters.type.includes(prod.type)) return false;
    if (filters.age.length > 0 && !filters.age.includes(prod.age)) return false;
    if (filters.theme.length > 0 && !filters.theme.includes(prod.theme)) return false;
    if (filters.interests.length > 0 && !filters.interests.includes(prod.interests)) return false;
    if (filters.pieces.length > 0 && !filters.pieces.includes(prod.pieces)) return false;
    if (filters.highlight.length > 0 && !filters.highlight.includes(prod.highlight)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price_low_high":
        return a.price - b.price;
      case "price_high_low":
        return b.price - a.price;
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <Container maxW="1920px" py={{ base: 6, md: 12 }}>
      {greeting && (
        <Heading
          as="h1"
          size="xl"
          mb={6}
          textAlign="center"
          color="gray.700"
          fontWeight="extrabold"
        >
          {greeting}
        </Heading>
      )}

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Flex align="start" gap={6} flexDirection={{ base: "column", md: "row" }}>
          {/* Sidebar filtros desktop */}
          <Box
            w={{ base: "100%", md: "220px" }}
            display={{ base: "none", md: "block" }}
            position="sticky"
            top="100px"
            flexShrink={0}
          >
            <ProductFilters filters={filters} setFilters={setFilters} />
          </Box>

          {/* Productos */}
          <Box flex="1">
            {/* Header mobile */}
            <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={2}>
              <Text fontSize="lg" fontWeight="bold">
                Mostrando {filteredProducts.length} productos de {products.length}
              </Text>

              <Flex gap={2}>
                {/* Botón abrir Drawer filtros en mobile */}
                <Button
                  variant="outline"
                  colorScheme="teal"
                  display={{ base: "inline-flex", md: "none" }}
                  onClick={onOpen}
                  size="sm"
                >
                  Filtrar
                </Button>

                <Select
                  w="200px"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  size="sm"
                >
                  <option value="recommended">Recomendados</option>
                  <option value="price_low_high">Precio: menor a mayor</option>
                  <option value="price_high_low">Precio: mayor a menor</option>
                  <option value="name_asc">Nombre A-Z</option>
                  <option value="name_desc">Nombre Z-A</option>
                </Select>
              </Flex>
            </Flex>

            {sortedProducts.length === 0 ? (
              <Center flexDir="column" py={20} color="gray.500">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/192/192292.png"
                  alt="No products"
                  boxSize="80px"
                  mb={4}
                  opacity={0.6}
                />
                <Text fontSize="lg" fontWeight="medium">
                  No se encontraron productos con los filtros seleccionados.
                </Text>
              </Center>
            ) : (
              <MotionBox
                key={JSON.stringify(filters) + sortOption}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProductList products={sortedProducts} />
              </MotionBox>
            )}
          </Box>
        </Flex>
      )}

      {/* Drawer filtros en mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default ItemListContainer;