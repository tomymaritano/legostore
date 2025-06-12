import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const ItemCount = ({ initial = 1, stock, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const toast = useToast();

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Stock máximo alcanzado.",
        description: `Solo hay ${stock} unidades disponibles.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
    toast({
      title: "Producto agregado.",
      description: `Agregaste ${quantity} unidades al carrito.`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box w="100%" mt={4}>
      {/* Contador */}
      <Flex justify="center" align="center" mb={4}>
        <IconButton
          icon={<MinusIcon />}
          onClick={handleDecrease}
          isDisabled={quantity === 1}
          aria-label="Disminuir"
          size="sm"
          mr={2}
        />
        <Text fontSize="xl" mx={2} minW="40px" textAlign="center">
          {quantity}
        </Text>
        <IconButton
          icon={<AddIcon />}
          onClick={handleIncrease}
          isDisabled={quantity === stock}
          aria-label="Aumentar"
          size="sm"
          ml={2}
        />
      </Flex>

      {/* Botón Agregar al carrito */}
      <Button
        colorScheme="teal"
        size="lg"
        w="100%"
        onClick={handleAddToCart}
        isDisabled={stock === 0}
      >
        Agregar al carrito
      </Button>
    </Box>
  );
};

export default ItemCount;