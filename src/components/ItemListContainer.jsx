import { useEffect, useState } from "react";
import { getProducts } from "../asyncMock";
import ItemList from "./ItemList";
import { Container } from "@chakra-ui/react";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container maxW='100%'>
      <ItemList products={products} />
    </Container>
  );
};

export default ItemListContainer;
