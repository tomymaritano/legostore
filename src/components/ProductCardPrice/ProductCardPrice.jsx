import { Text, Flex } from "@chakra-ui/react";

const ProductCardPrice = ({ price, originalPrice, isOnSale }) => {
  return (
    <Flex align="center" gap={2} flexWrap="wrap">
      {isOnSale && originalPrice && (
        <Text
          fontSize="md"
          color="gray.500"
          as="s"
          fontWeight="medium"
        >
          ${originalPrice}
        </Text>
      )}
      <Text
        fontSize="lg"
        fontWeight="bold"
        color={isOnSale ? "orange.500" : "teal.600"}
      >
        ${price}
      </Text>
    </Flex>
  );
};

export default ProductCardPrice;