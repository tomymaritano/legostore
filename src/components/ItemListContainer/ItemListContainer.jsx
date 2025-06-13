import {
  Container,
  Heading,
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
import useProducts from "../../hooks/useProducts";
import ProductList from "../ProductList/ProductList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const MotionBox = motion(Box);

const ItemListContainer = ({ greeting }) => {
  const [sortOption, setSortOption] = useState("recommended");
  const productsPerPage = 9;
  const { categoryId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    products,
    total,
    totalPages,
    page,
    setPage,
    filters,
    setFilters,
    isLoading,
    isFetching,
  } = useProducts({ categoryId, sortOption, productsPerPage });

  // Scroll to top cuando cambio filtros o sort o page
  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [filters, sortOption, page]);

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

      {isLoading ? (
        <Flex gap={6} wrap="wrap" justify="center">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} height="450px" width="300px" borderRadius="lg" />
          ))}
        </Flex>
      ) : (
        <Flex
          align="start"
          gap={6}
          flexDirection={{ base: "column", md: "row" }}
        >
          {/* Sidebar filtros desktop */}
          <Box
            w={{ base: "100%", md: "220px" }}
            display={{ base: "none", md: "block" }}
            position="sticky"
            top="100px"
            flexShrink={0}
          >
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              products={products}
            />
          </Box>

          {/* Productos */}
          <Box flex="1">
            <Flex
              justify="space-between"
              align="center"
              mb={4}
              flexWrap="wrap"
              gap={2}
            >
              <Flex flexDir="column">
                <Text fontSize="lg" fontWeight="bold">
                  Mostrando {total} productos
                </Text>
                {totalFiltersApplied > 0 && (
                  <Text fontSize="sm" color="teal.600">
                    {totalFiltersApplied} filtro
                    {totalFiltersApplied > 1 ? "s" : ""} aplicado
                    {totalFiltersApplied > 1 ? "s" : ""}
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

            {products.length === 0 ? (
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
                  key={JSON.stringify(filters) + sortOption + page}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProductList products={products} />
                </MotionBox>

                {isFetching && (
                  <Flex gap={6} wrap="wrap" justify="center" mt={4}>
                    {Array.from({ length: productsPerPage }).map((_, i) => (
                      <Skeleton
                        key={i}
                        height="450px"
                        width="300px"
                        borderRadius="lg"
                      />
                    ))}
                  </Flex>
                )}

                {/* Paginación */}
                <Flex justify="center" mt={8} gap={2}>
                  <Button
                    size="sm"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    isDisabled={page === 1}
                    aria-label="Página anterior"
                  >
                    Anterior
                  </Button>
                  <Text fontSize="sm" fontWeight="medium">
                    Página {page} / {totalPages}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() =>
                      setPage((p) => Math.min(p + 1, totalPages))
                    }
                    isDisabled={page === totalPages}
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
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              products={products}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default ItemListContainer;
