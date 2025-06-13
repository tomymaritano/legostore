import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import useCart from "../../hooks/useCart";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";

const CartModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, clearCart, totalQuantity, totalPrice } = useCart();

  return (
    <>
      {/* Botón para abrir el modal → podés ponerlo en NavBar */}
      <Button onClick={onOpen} colorScheme="teal">
        🛒 Carrito ({totalQuantity})
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tu Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {totalQuantity === 0 ? (
              <Text>No hay items en el carrito.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {cart.map((p) => (
                  <CartItem key={p.id} {...p} />
                ))}

                <Box textAlign="right" mt={4} w="100%">
                  <Text fontSize="xl" fontWeight="bold">
                    Total: ${totalPrice}
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => {
                clearCart();
                onClose();
              }}
              size="md"
            >
              Limpiar Carrito
            </Button>

            <Button
              as={Link}
              to="/checkout"
              colorScheme="teal"
              size="md"
              onClick={onClose}
              isDisabled={totalQuantity === 0}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;