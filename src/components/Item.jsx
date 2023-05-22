import {
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  Divider,
  CardFooter,
  Button,
  Link,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

const Item = ({ id, name, img, price, stock, description, category }) => {
  return (
    <Card
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      m={2}
    >
      <CardBody>
        <Image
          src={img}
          alt={name}
          borderRadius="sm"
          width="20vh"
          border={"1"}
          height={280}
        />
        <Stack mt="3" spacing="3">
          <Heading size="sm">{name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {price}kr.
          </Text>
          <Text color="blue.500" fontSize="sm">
            Avaiable Stock {stock}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
          <Link as={NavLink} to={`/item/${id}`}>
            Ver detalle
          </Link>
      </CardFooter>
    </Card>
  );
};

export default Item;
