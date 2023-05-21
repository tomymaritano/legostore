import { useEffect, useState } from "react";
import { getProductById } from "../asyncMock";
import ItemDetail from "./ItemDetail";
import { Container } from "@chakra-ui/react";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById("1")
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <ItemDetail {...product} />
    </Container>
  );
};

export default ItemDetailContainer;
