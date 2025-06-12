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
    Progress,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
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
        onModalOpen();
        onClose();
        clearCart();
    };

    const handleContinueShopping = () => {
        onModalClose();
        navigate("/");
    };

    // Animación bump para Badge
    const [bumpClass, setBumpClass] = useState("");

    useEffect(() => {
        if (totalQuantity === 0) return;
        setBumpClass("cart-bump");

        const timer = setTimeout(() => {
            setBumpClass("");
        }, 300);

        return () => clearTimeout(timer);
    }, [totalQuantity]);

    // Envío gratis
    const FREE_SHIPPING_THRESHOLD = 1000;
    const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
    const progressToFreeShipping = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <>
            {/* Drawer */}
            <Drawer
                placement="right"
                onClose={onClose}
                isOpen={isOpen}
                size="sm"
                motionPreset="slideInRight"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Tu Carrito</DrawerHeader>
                    <DrawerBody>
                        {totalQuantity === 0 ? (
                            <Text>No hay items en el carrito.</Text>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                {/* Faltan $X para envío gratis + progress */}
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
                                                🚚 Te faltan <strong>${amountToFreeShipping}</strong> para obtener envío gratis.
                                            </Text>
                                            <Progress
                                                value={progressToFreeShipping}
                                                colorScheme="teal"
                                                size="sm"
                                                borderRadius="md"
                                            />
                                        </>
                                    )}
                                </Box>

                                {/* Items */}
                                {cart.map((p) => (
                                    <CartItem key={p.id} {...p} />
                                ))}

                                {/* Total */}
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