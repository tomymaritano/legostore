import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Stack,
  Box,
} from "@chakra-ui/react";

const Cart = () => {
  const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <Container maxW="container.md" py={10} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>
          No hay items en el carrito
        </Heading>
        <Button as={Link} to="/" colorScheme="teal" size="md">
          Ir a Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Tu Carrito
      </Heading>

      <VStack spacing={4} align="stretch">
        {cart.map((p) => (
          <CartItem key={p.id} {...p} />
        ))}
      </VStack>

      <Box textAlign="right" mt={6}>
        <Text fontSize="xl" fontWeight="bold">
          Total: ${total}
        </Text>
      </Box>

      <Stack direction={{ base: "column", sm: "row" }} spacing={4} mt={6} justify="center">
        <Button
          colorScheme="red"
          variant="outline"
          onClick={clearCart}
          size="md"
        >
          Limpiar Carrito
        </Button>
        <Button
          as={Link}
          to="/checkout"
          colorScheme="teal"
          size="md"
        >
          Checkout
        </Button>
      </Stack>
    </Container>
  );
};

export default Cart;