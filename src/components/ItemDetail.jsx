import ItemCount from "./ItemCount";
import { useState } from "react"
import { NavLink } from "react-router-dom";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Stack,
  Divider,
} from "@chakra-ui/react";

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
  };
  return (
    <Card maxW="sm" border="1">
      <CardBody display={"flex"} flexDirection={'column'} justifyContent={'center'} alignItems={"center"}>
        <Image width={'50%'} src={img} alt={description} borderRadius="lg" />
        <Stack mt="3" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {price}kr.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {quantityAdded > 0 ? (
          <Link to="/cart">Finalizar Compra</Link>
        ) : (
          <ItemCount
            initial={1}
            stock={stock}
            onAdd={(quantity) => console.log("Cantidad Agregada", quantity)}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemDetail;
