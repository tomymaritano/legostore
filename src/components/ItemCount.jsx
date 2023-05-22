import React, { useState } from "react";
import { Container, Box, Button, Stack, Text } from "@chakra-ui/react";
const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    
    <Container justifyContent='center' align="center">
      <Box m="2">
        <Stack justifyContent='center' align="center" direction="row" spacing={4}>
          <Button size={"sm"} bgColor={"#f68024"} onClick={decrement}>-</Button>
          <Text fontSize="md" as={"b"}>{quantity}</Text>
          <Button size={"sm"} bgColor={"#f68024"} onClick={increment}>+</Button>
        </Stack>
      </Box>
      <Box>
        <Button size={"sm"} bgColor={"#f68024"} onClick={() => onAdd(quantity)} disabled={!stock}>
          Agregar al Carrito
        </Button>
      </Box>
    </Container>
  );
};

export default ItemCount;
