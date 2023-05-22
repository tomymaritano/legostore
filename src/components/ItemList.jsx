import { Container, SimpleGrid,} from "@chakra-ui/react";
import Item from "./Item";

const ItemList = ({ products }) => {
  return (
    <SimpleGrid columns={5} spacing={15}>
      {products.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
  </SimpleGrid>

  );
};

export default ItemList;
