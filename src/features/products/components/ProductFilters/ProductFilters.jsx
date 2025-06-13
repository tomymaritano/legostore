import {
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Heading,
  Divider,
  Collapse,
  useDisclosure,
  Button,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProductFiltersHeader from "../ProductFIltersHeader/ProductFiltersHeader";
import useFilterCounts from "../../hooks/useFilterCounts";
import { FILTER_CONFIG } from "../../services/productService";


const ProductFilters = ({ filters, setFilters, filteredProducts, products }) => {
  const collapses = FILTER_CONFIG.map(() => useDisclosure({ defaultIsOpen: true }));

  const [showMoreMap, setShowMoreMap] = useState({});
  const countsByFilterKey = useFilterCounts(filters, products);

  const handleCheckboxChange = (key, values) => {
    setFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleClearFilters = () => {
    const cleared = FILTER_CONFIG.reduce((acc, filter) => {
      acc[filter.key] = [];
      return acc;
    }, {});
    setFilters(cleared);
  };

  const totalFiltersApplied = Object.values(filters).reduce(
    (acc, curr) => acc + (curr?.length || 0),
    0
  );

  const renderFilterSection = (filter, index) => {
    const { isOpen, onToggle } = collapses[index];
    const currentSelected = filters[filter.key]?.length || 0;
    const maxVisible = showMoreMap[filter.key] ? filter.options.length : 5;
    const visibleOptions = filter.options.slice(0, maxVisible);

    return (
      <Box key={filter.key} mb={4}>
        <Flex
          as={Button}
          onClick={onToggle}
          size="sm"
          variant="ghost"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={3}
          fontWeight="semibold"
          color="gray.700"
          _hover={{ bg: "gray.50" }}
        >
          {filter.label} {currentSelected > 0 && `(${currentSelected})`}
          <Icon
            as={ChevronDownIcon}
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.2s ease"
          />
        </Flex>
        <Collapse in={isOpen}>
          <CheckboxGroup
            value={filters[filter.key] || []}
            onChange={(values) => handleCheckboxChange(filter.key, values)}
          >
            <Stack spacing={2} pl={2} pt={2}>
              {visibleOptions.map((opt) => (
                <Checkbox
                  key={opt}
                  value={opt}
                  fontWeight="medium"
                  borderRadius="md"
                  px={2}
                  py={1}
                  _hover={{ bg: "gray.50" }}
                >
                  {opt} ({countsByFilterKey?.[filter.key]?.[opt] || 0})
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>

          {filter.options.length > 5 && (
            <Button
              size="xs"
              variant="link"
              mt={2}
              onClick={() =>
                setShowMoreMap((prev) => ({
                  ...prev,
                  [filter.key]: !prev[filter.key],
                }))
              }
              color="teal.600"
              pl={2}
            >
              {showMoreMap[filter.key] ? "Mostrar menos" : "Mostrar más"}
            </Button>
          )}
        </Collapse>
      </Box>
    );
  };


  return (
    <Box position="sticky" top="100px" maxW="240px" fontSize="sm">
      <Heading size="sm" mb={4} fontWeight="bold">
        Filtros
      </Heading>

      {totalFiltersApplied > 0 && (
        <Text mb={2} fontSize="sm" color="teal.600" fontWeight="medium">
          {totalFiltersApplied} filtro{totalFiltersApplied > 1 ? "s" : ""} aplicado
          {totalFiltersApplied > 1 ? "s" : ""}
        </Text>
      )}

      <Button
        size="sm"
        colorScheme="gray"
        variant="outline"
        mb={6}
        w="100%"
        onClick={handleClearFilters}
        isDisabled={totalFiltersApplied === 0}
      >
        Limpiar Filtros
      </Button>
      <ProductFiltersHeader filters={filters} onClear={handleClearFilters} />
      {FILTER_CONFIG.map((filter, index) => renderFilterSection(filter, index))}

      <Divider mt={6} />
    </Box>
  );
};

export default ProductFilters;
