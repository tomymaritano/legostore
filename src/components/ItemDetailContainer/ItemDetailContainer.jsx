import {
    Container,
    Heading,
    Spinner,
    Center,
    Text,
    Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productService";
import ItemDetail from "../ItemDetail/ItemDetail"; // tu componente de detalle
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { promise, cancel } = getProductById(productId, { retries: 2 });
        setLoading(true);
        promise
            .then((data) => setProduct(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
        return cancel;
    }, [productId]);

    return (
        <Container maxW="container.lg" py={{ base: 6, md: 6 }}>
            {loading ? (
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