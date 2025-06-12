import { Container, SimpleGrid } from "@chakra-ui/react";
import Item from "../Item/Item";

const ItemList = ({ products }) => {
  return (
    <Container maxW={{ base: "100%", md: "80%", lg: "60%" }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={15}>
        {products.map((prod) => (
          <Item key={prod.id} {...prod} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ItemList;
