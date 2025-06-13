import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  HStack,
  Image,
  Box,
  Text,
  IconButton,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cart,
    totalQuantity,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const toast = useToast();

  const handleCheckout = () => {
    toast({
      title: "¡Gracias por tu compra!",
      description: "Tu pedido ha sido procesado.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    clearCart();
    onClose();
  };

  // Envío gratis
  const FREE_SHIPPING_THRESHOLD = 1000;
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const progressToFreeShipping = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontWeight="bold" borderBottom="1px solid #e2e8f0">
          🛍️ Tu carrito ({totalQuantity} item{totalQuantity !== 1 ? "s" : ""})
        </DrawerHeader>

        <DrawerBody p={4}>
          {cart.length === 0 ? (
            <Text mt={6} textAlign="center" color="gray.500">
              No hay productos en el carrito.
            </Text>
          ) : (
            <>
              {/* Envío gratis */}
              <Box
                w="100%"
                bg="gray.100"
                p={3}
                borderRadius="md"
                mb={4}
                textAlign="center"
                fontSize="sm"
                fontWeight="medium"
              >
                {amountToFreeShipping === 0 ? (
                  <Text color="green.600">🎉 ¡Tu pedido califica para envío gratis!</Text>
                ) : (
                  <>
                    <Text mb={2}>
                      🚚 Te faltan <strong>${amountToFreeShipping.toLocaleString("es-AR")}</strong> para obtener envío gratis.
                    </Text>
                    <Progress
                      value={progressToFreeShipping}
                      colorScheme="teal"
                      size="sm"
                      borderRadius="md"
                      transition="all 0.5s ease-in-out"
                    />
                  </>
                )}
              </Box>

              {/* Productos */}
              <VStack spacing={4} align="stretch" maxH="calc(100vh - 300px)" overflowY="auto">
                {cart.map((item) => {
                  const productImage =
                    item.image || item.img || (item.images?.[0]) || "https://via.placeholder.com/50";

                  return (
                    <Box key={item.id} borderWidth="1px" borderRadius="md" p={3} boxShadow="sm">
                      <HStack spacing={4} align="center">
                        <Image
                          src={productImage}
                          alt={item.name}
                          boxSize="60px"
                          objectFit="contain"
                          borderRadius="md"
                          bg="gray.50"
                        />
                        <Box flex="1">
                          <Text fontWeight="medium" noOfLines={1}>
                            {item.name}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Precio: ${item.price} | Subtotal: ${(item.price * item.quantity).toLocaleString("es-AR")}
                          </Text>
                          <HStack mt={2}>
                            <IconButton
                              icon={<FaMinus />}
                              size="xs"
                              variant="outline"
                              aria-label="Disminuir cantidad"
                              onClick={() => decreaseQuantity(item.id)}
                              isDisabled={item.quantity === 1}
                              _hover={{ bg: "gray.200" }}
                            />
                            <Text>{item.quantity}</Text>
                            <IconButton
                              icon={<FaPlus />}
                              size="xs"
                              variant="outline"
                              aria-label="Aumentar cantidad"
                              onClick={() => increaseQuantity(item.id)}
                              _hover={{ bg: "gray.200" }}
                            />
                          </HStack>
                        </Box>
                        <IconButton
                          icon={<FaTrashAlt />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          aria-label="Eliminar producto"
                          onClick={() => removeItem(item.id)}
                          _hover={{ bg: "red.50" }}
                        />
                      </HStack>
                    </Box>
                  );
                })}
              </VStack>
            </>
          )}
        </DrawerBody>

        <DrawerFooter flexDir="column" alignItems="stretch" borderTop="1px solid #e2e8f0">
          <Box w="100%" mb={3}>
            <Text fontSize="lg" fontWeight="bold">
              Total: ${(total ?? 0).toLocaleString("es-AR")}
            </Text>
          </Box>
          <Button
            colorScheme="teal"
            size="md"
            w="100%"
            mb={2}
            onClick={handleCheckout}
            isDisabled={cart.length === 0}
          >
            💳 Finalizar compra
          </Button>
          <Button
            variant="outline"
            size="md"
            w="100%"
            onClick={clearCart}
            isDisabled={cart.length === 0}
          >
            🗑️ Vaciar carrito
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;