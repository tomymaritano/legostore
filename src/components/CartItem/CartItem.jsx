import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";

const CartItem = ({ id, name, img, price, quantity }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

  const subtotal = price * quantity;

  return (
    <Flex
      borderWidth="1px"
      borderRadius="md"
      p={3}
      align="center"
      justify="space-between"
      gap={4}
      w="100%"
    >
      <Image src={img} alt={name} boxSize="60px" objectFit="contain" />

      <Box flex="1">
        <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          ${price} x {quantity} = ${subtotal}
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
        />
        <Text minW="20px" textAlign="center">
          {quantity}
        </Text>
        <IconButton
          icon={<AddIcon />}
          size="xs"
          variant="outline"
          onClick={() => increaseQuantity(id)}
        />
      </Flex>

      {/* Remove item */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        colorScheme="red"
        onClick={() => removeItem(id)}
      />
    </Flex>
  );
};

export default CartItem;