import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../Service/asyncMock";
import ItemList from "../ItemList/ItemList";
import { Container } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const asyncFunc = categoryId ? getProductsByCategory : getProducts;
    asyncFunc(categoryId)
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId]);

  return (
    <Container maxW="100%">
      <h1>{greeting}</h1>
      <ItemList products={products} />
    </Container>
  );
};

export default ItemListContainer;
