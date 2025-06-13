import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import useCart from "../../hooks/useCart";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";

const CartItem = ({ id, name, price, quantity, image, img, images }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const subtotal = price * quantity;

  const productImage = image || img || (images?.[0]) || "https://via.placeholder.com/50";

  return (
    <Flex
      borderWidth="1px"
      borderRadius="md"
      p={3}
      align="center"
      justify="space-between"
      gap={4}
      w="100%"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      <Image
        src={productImage}
        alt={name}
        boxSize="60px"
        objectFit="contain"
        borderRadius="md"
        bg="gray.50"
      />

      <Box flex="1" minW="0">
        <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" mt={1}>
          ${price.toLocaleString("es-AR")} x {quantity} = ${subtotal.toLocaleString("es-AR")}
        </Text>
      </Box>

      {/* Quantity controls */}
      <Flex align="center" gap={1}>
        <IconButton
          icon={<MinusIcon />}
          size="xs"
          variant="outline"
          onClick={() => decreaseQuantity(id)}
          isDisabled={quantity === 1}
          _hover={{ bg: "gray.200" }}
          aria-label="Disminuir cantidad"
        />
        <Text minW="20px" textAlign="center">
          {quantity}
        </Text>
        <IconButton
          icon={<AddIcon />}
          size="xs"
          variant="outline"
          onClick={() => increaseQuantity(id)}
          _hover={{ bg: "gray.200" }}
          aria-label="Aumentar cantidad"
        />
      </Flex>

      {/* Remove item */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        colorScheme="red"
        onClick={() => removeItem(id)}
        _hover={{ bg: "red.50" }}
        aria-label="Eliminar producto"
      />
    </Flex>
  );
};

export default CartItem;
