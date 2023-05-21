import ItemCount from "./ItemCount";

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
  return (
      <Card maxW="md" border='4'>
        <CardBody>
          <Image src={img} alt={description} borderRadius="lg"/>
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ItemCount
            initial={1}
            stock={stock}
            onAdd={(quantity) => console.log("Cantidad Agregada", quantity)}
          />
        </CardFooter>
      </Card>
  );
};

export default ItemDetail;
