import { Badge } from "@chakra-ui/react";

const ProductCardBadge = ({ isNew, isOnSale, stock }) => {
  if (stock === 0) {
    return (
      <Badge position="absolute" top={2} left={2} colorScheme="red" borderRadius="full" px={2} py={1}>
        Sin stock
      </Badge>
    );
  }

  if (isOnSale) {
    return (
      <Badge position="absolute" top={2} left={2} colorScheme="orange" borderRadius="full" px={2} py={1}>
        Oferta
      </Badge>
    );
  }

  if (isNew) {
    return (
      <Badge position="absolute" top={2} left={2} colorScheme="teal" borderRadius="full" px={2} py={1}>
        Nuevo
      </Badge>
    );
  }

  return null;
};

export default ProductCardBadge;