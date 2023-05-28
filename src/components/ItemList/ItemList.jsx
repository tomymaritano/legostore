import { Container, SimpleGrid } from "@chakra-ui/react";
import Item from "../Item/Item";

const ItemList = ({ products }) => {
  return (
    <Container maxW={"60%"}>
      <SimpleGrid columns={4} spacing={15}>
        {products.map((prod) => (
          <Item key={prod.id} {...prod} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ItemList;
