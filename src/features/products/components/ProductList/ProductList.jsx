import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ products }) => {
  return (
    <Box px={{ base: 4, md: 6, xl: 8 }} w="100%">
      {products.length === 0 ? (
        <Text fontSize="lg" color="gray.500" textAlign="center" py={10}>
          No se encontraron productos.
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, xl: 4 }} // 👈 columnas adaptables PRO
          spacing={{ base: 6, md: 6 }}
          minChildWidth="340px" // opcional, ayuda a mantener buena visual
        >
          {products.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              name={prod.name}
              price={prod.price}
              image={prod.img} // fix
              stock={prod.stock}
              description={prod.description}
              category={prod.category}
              isNew={prod.isNew}
              isOnSale={prod.isOnSale}
              rating={prod.rating}
              shortDescription={prod.shortDescription}
              originalPrice={prod.originalPrice}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProductList;
