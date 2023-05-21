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
  Container,
  Flex,
} from "@chakra-ui/react";

const Item = ({ id, name, img, price, stock, description }) => {
  return (
    <Container>
      <Flex>
        <Card maxW="lg" width={300} m={2}>
          <CardBody>
            <Image src={img} alt={name} borderRadius="lg" />
            <Text>{description}</Text>
            <Stack mt="6" spacing="3">
              <Heading size="md">{name}</Heading>
              <Text color="blue.600" fontSize="2xl">
                ${price}
              </Text>
              <Text color="white" fontSize="md">
                Avaiable Stock {stock}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>Ver detalle</Button>
          </CardFooter>
        </Card>
      </Flex>
    </Container>
  );
};

export default Item;
