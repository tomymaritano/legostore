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
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "../Service/asyncMock";
import ProductList from "../ProductList/ProductList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";


const MotionBox = motion(Box);

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
    const { categoryId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parseFiltersFromParams = () => ({
    type: searchParams.getAll("type"),
    age: searchParams.getAll("age"),
    theme: searchParams.getAll("theme"),
    interests: searchParams.getAll("interests"),
    pieces: searchParams.getAll("pieces"),
    highlight: searchParams.getAll("highlight"),
  });

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
    setCurrentPage(1); // Reset page cuando cambian filtros
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
      if (categoryId && prod.category !== categoryId) return false; // 🔥 importante

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

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Scroll to top cuando cambio filtros o sort o page
  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [filters, sortOption, currentPage]);

  const totalFiltersApplied = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

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
        <Flex gap={6} wrap="wrap" justify="center">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={i}
              height="450px"
              width="300px"
              borderRadius="lg"
            />
          ))}
        </Flex>
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
            <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={2}>
              <Flex flexDir="column">
                <Text fontSize="lg" fontWeight="bold">
                  Mostrando {filteredProducts.length} productos de {products.length}
                </Text>
                {totalFiltersApplied > 0 && (
                  <Text fontSize="sm" color="teal.600">
                    {totalFiltersApplied} filtro{totalFiltersApplied > 1 ? "s" : ""} aplicado{totalFiltersApplied > 1 ? "s" : ""}
                  </Text>
                )}
              </Flex>

              <Flex gap={2}>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  display={{ base: "inline-flex", md: "none" }}
                  onClick={onOpen}
                  size="sm"
                  aria-label="Abrir filtros"
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

            {paginatedProducts.length === 0 ? (
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
              <>
                <MotionBox
                  key={JSON.stringify(filters) + sortOption + currentPage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProductList products={paginatedProducts} />
                </MotionBox>

                {/* Paginación */}
                <Flex justify="center" mt={8} gap={2}>
                  <Button
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    isDisabled={currentPage === 1}
                    aria-label="Página anterior"
                  >
                    Anterior
                  </Button>
                  <Text fontSize="sm" fontWeight="medium">
                    Página {currentPage} / {Math.ceil(sortedProducts.length / productsPerPage)}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(p + 1, Math.ceil(sortedProducts.length / productsPerPage))
                      )
                    }
                    isDisabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
                    aria-label="Página siguiente"
                  >
                    Siguiente
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      )}

      {/* Drawer filtros en mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10} px={4}>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default ItemListContainer;