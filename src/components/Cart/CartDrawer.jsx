import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Text,
  Box,
  useDisclosure,
  IconButton,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cart,
    clearCart,
    totalQuantity,
    total,
  } = useContext(CartContext);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const handleCheckout = () => {
    // Mostrar modal
    onModalOpen();
    // Cerrar Drawer
    onClose();
    // Limpiar carrito en el modal después de un tiempo (o al cerrar modal)
    clearCart();
  };

  const handleContinueShopping = () => {
    onModalClose();
    navigate("/"); // te manda al Home
  };

  return (
    <>
      {/* Botón ícono carrito */}
      <Box position="relative">
        <IconButton
          icon={<FaShoppingBag />}
          aria-label="Abrir carrito"
          variant="ghost"
          size="md"
          onClick={onOpen}
        />
        {totalQuantity > 0 && (
          <Badge
            colorScheme="green"
            borderRadius="full"
            position="absolute"
            top="-1"
            right="-1"
            fontSize="0.7em"
            px={1.5}
          >
            {totalQuantity}
          </Badge>
        )}
      </Box>

      {/* Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu Carrito</DrawerHeader>

          <DrawerBody>
            {totalQuantity === 0 ? (
              <Text>No hay items en el carrito.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {cart.map((p) => (
                  <CartItem key={p.id} {...p} />
                ))}

                <Box textAlign="right" mt={4} w="100%">
                  <Text fontSize="xl" fontWeight="bold">
                    Total: ${total}
                  </Text>
                </Box>
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter display="flex" flexDirection="column" gap={2}>
            <Button
              colorScheme="red"
              variant="outline"
              w="100%"
              onClick={() => {
                clearCart();
                onClose();
              }}
              size="md"
              isDisabled={totalQuantity === 0}
            >
              Limpiar Carrito
            </Button>

            <Button
              colorScheme="teal"
              w="100%"
              size="md"
              onClick={handleCheckout}
              isDisabled={totalQuantity === 0}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Modal de "Gracias por tu compra" */}
      <Modal isOpen={isModalOpen} onClose={handleContinueShopping} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¡Gracias por tu compra!</ModalHeader>
          <ModalBody>
            <Text>Te enviaremos la confirmación por email.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleContinueShopping}>
              Seguir comprando
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartDrawer;