import ItemCount from "../ItemCount/ItemCount";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Stack,
  Link,
  Button,
  Divider,
} from "@chakra-ui/react";

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItem } = useContext(CartContext)

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = {
      id, name, price
    }

    addItem(item, quantity)

  }

  return (
    <Card maxW="md" border="4">
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image width={"40%"} src={img} alt={description} borderRadius="lg" />
        <Stack mt="3" spacing="3">
          <Heading size="sm">{name}</Heading>
          <Text>{description}</Text>
          <Text>{category}</Text>
          <Text color="blue.600" fontSize="md">
            {price}kr.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {quantityAdded > 0 ? (
          <Button bgColor={'#f68024'}>
            <Link as={NavLink} to="/cart">
              End shopping
            </Link>
          </Button>
        ) : (
          <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemDetail;
