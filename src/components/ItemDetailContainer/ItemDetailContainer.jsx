import { useEffect, useState } from "react";
import { getProductById } from "../Service/asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import {
  Container,
  Spinner,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const response = await getProductById(itemId);
        setProduct(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  return (
    <Container maxW="container.lg" py={6}>
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Center py={10}>
          <Text color="red.500">{error}</Text>
        </Center>
      ) : product ? (
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ItemDetail {...product} />
        </MotionBox>
      ) : (
        <Center py={10}>
          <Text>No product found.</Text>
        </Center>
      )}
    </Container>
  );
};

export default ItemDetailContainer;