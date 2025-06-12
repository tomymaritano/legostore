import { useEffect, useState } from "react";
import { getProductById } from "../Service/asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import {
  Container,
  Spinner,
  Center,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ItemDetailContainer = ({ isModal = false }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const response = await getProductById(itemId);
        setProduct(response);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  const handleCloseModal = () => {
    navigate(-1); // vuelve atrás (al backgroundLocation)
  };

  // ✅ Si es Modal → mostrar Modal
  if (isModal) {
    return (
      <Modal isOpen onClose={handleCloseModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            ) : product ? (
              <ItemDetail {...product} />
            ) : (
              <Center py={10}>
                <Text fontSize="lg" color="gray.500">
                  No se encontró el producto.
                </Text>
              </Center>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // ✅ Si no es Modal → página normal (como ya tenías)
  return (
    <Container maxW="container.lg" py={6}>
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
          <Text fontSize="lg" color="gray.500">
            No se encontró el producto.
          </Text>
        </Center>
      )}
    </Container>
  );
};

export default ItemDetailContainer;