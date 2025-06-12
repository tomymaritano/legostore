import {
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Badge,
  CardFooter,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";

const MotionBox = motion(Box);

const Item = ({
  id,
  name,
  img,
  price,
  stock,
  description,
  category,
  isNew,
  isOnSale,
}) => {
  const { addItem, cart } = useContext(CartContext);
  const toast = useToast();

  // Determinar qué badge mostrar
  let badgeText = null;
  let badgeColor = "teal";

  if (stock === 0) {
    badgeText = "OUT OF STOCK";
    badgeColor = "red";
  } else if (isOnSale) {
    badgeText = "SALE";
    badgeColor = "orange";
  } else if (isNew) {
    badgeText = "NEW";
    badgeColor = "teal";
  }

  // Handler para agregar al carrito
  const handleAddToCart = () => {
    const productToAdd = {
      id,
      name,
      price,
      img,
      stock,
    };

    // Si no hay stock → error (esto es redundante, porque el botón ya se desactiva, pero es PRO UX)
    if (stock === 0) {
      toast({
        title: "Sin stock.",
        description: "Este producto no tiene stock disponible.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    // Ver si ya está en el carrito
    const isInCart = cart.some((prod) => prod.id === id);

    if (isInCart) {
      toast({
        title: "Producto ya en el carrito.",
        description: `${name} ya estaba en tu carrito.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      // Agregar producto
      addItem(productToAdd, 1);

      toast({
        title: "Producto agregado.",
        description: `${name} se agregó al carrito.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Card
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      m={2}
      boxShadow="md"
      position="relative"
      overflow="hidden"
      role="group"
    >
      <CardBody p={0} w="100%" position="relative">
        <Image
          src={img}
          alt={name}
          w="100%"
          h="300px"
          objectFit="contain"
          backgroundColor="white"
          transition="all 0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />

        {/* Badge dinámico */}
        {badgeText && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            colorScheme={badgeColor}
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            textTransform="uppercase"
          >
            {badgeText}
          </Badge>
        )}
      </CardBody>

      {/* Info */}
      <Stack mt={4} mb={4} px={4} spacing={2} textAlign="center">
        <Heading size="sm" noOfLines={1}>
          {name}
        </Heading>
        <Text color="blue.600" fontSize="lg" fontWeight="bold">
          {price} kr.
        </Text>
        <Text color="gray.600" fontSize="sm">
          Stock: {stock}
        </Text>
      </Stack>

      {/* Footer con botones */}
      <CardFooter w="100%">
        <Flex w="100%" justifyContent="space-between" gap={2}>
          <Button
            as={NavLink}
            to={`/item/${id}`}
            size="sm"
            colorScheme="teal"
            flex="1"
          >
            Ver detalle
          </Button>

          <Button
            size="sm"
            colorScheme="orange"
            flex="1"
            onClick={handleAddToCart}
            isDisabled={stock === 0}
          >
            Agregar al carrito
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Item;