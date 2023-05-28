import {
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  CardFooter,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

const Item = ({ id, name, img, price, stock, description, category }) => {
  return (
    <Card display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} m={2}>
      <CardBody display={'flex'} flexDirection={'column'} alignItems={"center"}>
        <Image
          src={img}
          alt={name}
          border={"none"}
        />
        <Stack mt="3" spacing="3">
          <Heading size="sm">{name} {category}</Heading>
          <Text fontSize="sm">
           {description}
          </Text>
          <Text color="blue.600" fontSize="xl">
            {price}kr.
          </Text>
          <Text color="darkgrey" fontSize="sm">
            Avaiable Stock {stock}
          </Text>
        </Stack>
      </CardBody>
      <Divider  />
      <CardFooter size="sm">
        <Button size={"sm"} bgColor={"#f68024"}>
          <Link as={NavLink} to={`/item/${id}`}>
            Ver detalle
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Item;
