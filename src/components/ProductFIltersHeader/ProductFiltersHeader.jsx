import { Flex, Text, Button } from "@chakra-ui/react";

const ProductFiltersHeader = ({ filters, onClear }) => {
  const totalFiltersApplied = Object.values(filters).reduce(
    (acc, curr) => acc + (curr?.length || 0),
    0
  );

  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Text fontSize="sm" fontWeight="medium" color="gray.700">
        {totalFiltersApplied > 0
          ? `${totalFiltersApplied} filtro${totalFiltersApplied > 1 ? "s" : ""} aplicado${totalFiltersApplied > 1 ? "s" : ""}`
          : "Sin filtros aplicados"}
      </Text>

      <Button
        size="xs"
        variant="outline"
        colorScheme="gray"
        onClick={onClear}
        isDisabled={totalFiltersApplied === 0}
      >
        Limpiar Filtros
      </Button>
    </Flex>
  );
};

export default ProductFiltersHeader;