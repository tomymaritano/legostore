import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../Service/asyncMock";
import ItemList from "../ItemList/ItemList";
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
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Container maxW="100%" py={6}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        {greeting}
      </Heading>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Center py={10}>
          <Text color="red.500">{error}</Text>
        </Center>
      ) : products.length === 0 ? (
        <Center py={10}>
          <Text>No products found.</Text>
        </Center>
      ) : (
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ItemList products={products} />
        </MotionBox>
      )}
    </Container>
  );
};

export default ItemListContainer;