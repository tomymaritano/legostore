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

} from "@chakra-ui/react";

const Item = ({ id, name, img, price, stock, description }) => {
  return (
        <Card m={2}>
          <CardBody>
            <Image src={img} alt={name} borderRadius="sm" width='20vh'/>
            <Stack mt="3" spacing="3">
              <Heading size="sm">{name}</Heading>
              <Text fontSize="xs">{description}</Text>
              <Text color="blue.600" fontSize="2xl">
                ${price}
              </Text>
              <Text color="blue.500" fontSize="sm">
                Avaiable Stock {stock}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button bgColor={"#F68024"}>Ver detalle</Button>
          </CardFooter>
        </Card>
  );
};

export default Item;
