import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../Service/asyncMock";
import ProductList from "../ProductList/ProductList";
import {
  Container,
  Heading,
  Spinner,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        const response = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        setProducts(response);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Container maxW="1920px" py={{ base: 6, md: 6 }}>
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
      ) : error ? (
        <Center py={10}>
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        </Center>
      ) : products.length === 0 ? (
        <Center py={10}>
          <Text fontSize="lg" color="gray.500">
            No se encontraron productos.
          </Text>
        </Center>
      ) : (
        <MotionBox
          key={categoryId} // para re-animar al cambiar categoría
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

export default ItemListContainer;