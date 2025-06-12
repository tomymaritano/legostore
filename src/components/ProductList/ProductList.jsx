import { SimpleGrid, Box } from "@chakra-ui/react";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ products }) => {
  return (
    <Box px={{ base: 4, md: 8 }} w="100%">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }} // 3 columnas en desktop (md), nunca 4
        spacing={{ base: 6, md: 8 }} // un poco más de espacio en desktop
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
    </Box>
  );
};

export default ProductList;