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
  Badge,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

const ItemDetail = ({ id, name, img, category, description, price, stock, isNew, isOnSale }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = {
      id,
      name,
      price,
    };

    addItem(item, quantity);
  };

  return (
    <Card maxW="md" border="1px" boxShadow="md" mx="auto">
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        p={6}
      >
        {/* Badge */}
        <Box w="100%" mb={2}>
          {isNew && (
            <Badge colorScheme="teal" mr={2}>
              New
            </Badge>
          )}
          {isOnSale && (
            <Badge colorScheme="orange">
              Sale
            </Badge>
          )}
        </Box>

        <MotionImage
          width={"60%"}
          src={img}
          alt={description}
          borderRadius="lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          mb={4}
        />

        <Stack mt="3" spacing="3" textAlign="center">
          <Heading size="md">{name}</Heading>
          <Text color="gray.600" fontSize="sm">
            {category}
          </Text>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="xl" fontWeight="bold">
            {price} kr.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="center" py={4}>
        {quantityAdded > 0 ? (
          <Button as={NavLink} to="/cart" colorScheme="teal" size="lg">
            Finalizar compra
          </Button>
        ) : (
          <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemDetail;