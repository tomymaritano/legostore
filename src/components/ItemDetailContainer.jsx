import { useEffect, useState } from "react";
import { getProductById } from "../asyncMock";
import ItemDetail from "./ItemDetail";
import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    getProductById(itemId)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);
  return (
    <Container>
      <ItemDetail {...product} />
    </Container>
  );
};

export default ItemDetailContainer;
