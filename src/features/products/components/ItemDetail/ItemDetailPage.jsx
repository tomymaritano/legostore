import {
  Box,
  Center,
  Container,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import ItemDetail from "./ItemDetail";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const ItemDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: product, isLoading } = useProduct(productId);

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isLoading && product === undefined) {
      toast({
        title: "Producto no encontrado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    }
  }, [isLoading, product, navigate, toast]);

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
            {isLoading ? (
              <Center py={20}>Cargando producto...</Center>
            ) : (
              product && <ItemDetail product={product} />
            )}
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default ItemDetailPage;
