import {
  Box,
  Center,
  Container,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../Service/asyncMock";
import ItemDetail from "./ItemDetail";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const ItemDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(productId);
      if (data) {
        setProduct(data);
      } else {
        toast({
          title: "Producto no encontrado.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/", { replace: true });
      }
    };

    fetchProduct();

    // disable scroll cuando abre modal
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [productId, navigate, toast]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      navigate(-1);
    }, 300); // delay para que termine animación
  };

  const handleBackdropClick = (e) => {
    // si clickeo el backdrop (no el modal) → cerrar
    if (e.target.id === "backdrop") {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          id="backdrop"
          onClick={handleBackdropClick}
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex="modal"
          display="flex"
          alignItems="center"
          justifyContent="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionBox
            bg="white"
            borderRadius="md"
            maxW="960px"
            w="90%"
            maxH="90vh"
            overflowY="auto"
            p={6}
            position="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Botón cerrar */}
            <IconButton
              icon={<CloseIcon />}
              variant="ghost"
              size="sm"
              position="absolute"
              top={2}
              right={2}
              onClick={handleClose}
              aria-label="Cerrar modal"
            />

            {/* Contenido */}
            {product ? (
              <ItemDetail product={product} />
            ) : (
              <Center py={20}>Cargando producto...</Center>
            )}
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default ItemDetailPage;