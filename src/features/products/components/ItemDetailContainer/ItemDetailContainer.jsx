import {
  Container,
  Spinner,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useProduct from "../../hooks/useProduct";
import ItemDetail from "../ItemDetail/ItemDetail";

const MotionBox = motion(Box);

const ItemDetailContainer = () => {
    const { productId } = useParams();
    const { data: product, isLoading } = useProduct(productId);

    return (
        <Container maxW="container.lg" py={{ base: 6, md: 6 }}>
            {isLoading ? (
                <Center py={10}>
                    <Spinner size="xl" />
                </Center>
            ) : product ? (
                <MotionBox
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <ItemDetail product={product} />
                </MotionBox>
            ) : (
                <Center py={10}>
                    <Text fontSize="lg" color="red.500">
                        Producto no encontrado.
                    </Text>
                </Center>
            )}
        </Container>
    );
};

export default ItemDetailContainer;
