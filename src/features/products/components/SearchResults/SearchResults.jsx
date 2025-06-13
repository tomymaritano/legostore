import {
  Container,
  Heading,
  Text,
  Spinner,
  Center,
  Box,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import useSearchProducts from "../../hooks/useSearchProducts";
import ProductList from "../ProductList/ProductList"; // tu componente ya listo
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  const { data: products = [], isLoading } = useSearchProducts(searchQuery);

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 12 }}>
      <Heading as="h1" size="xl" mb={6} textAlign="center" color="gray.700" fontWeight="extrabold">
        Resultados para: "{searchQuery}"
      </Heading>

      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : products.length === 0 ? (
        <Center py={10}>
          <Text fontSize="lg" color="gray.500">
            No se encontraron productos para tu búsqueda.
          </Text>
        </Center>
      ) : (
        <MotionBox
          key={searchQuery} // re-animación si cambia la búsqueda
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ProductList products={products} />
        </MotionBox>
      )}
    </Container>
  );
};

export default SearchResults;
