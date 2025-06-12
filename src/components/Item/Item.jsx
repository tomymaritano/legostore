import {
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  Button,
  Badge,
  CardFooter,
  Flex,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { motion } from "framer-motion";

// MotionButton
const MotionButton = motion(Button);

const Item = ({
  id,
  name,
  img,
  price,
  originalPrice,
  stock,
  isNew,
  isOnSale,
  rating,
  shortDescription,
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
      borderRadius="md"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)", // levita un poco
        boxShadow: "xl", // sombra más fuerte
      }}
    >
      <CardBody p={0} w="100%" position="relative">
        <Image
          src={img}
          alt={name}
          w="100%"
          h="300px"
          objectFit="contain"
          backgroundColor="white"
          transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease"
          _groupHover={{
            transform: "scale(1.07)",
            opacity: 0.95,
          }}
        />

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

        {/* Short description */}
        <Text color="gray.600" fontSize="sm" noOfLines={2}>
          {shortDescription}
        </Text>

        {/* Rating */}
        <HStack justify="center" spacing="1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                boxSize={4}
                color={i < Math.floor(rating) ? "teal.400" : "gray.300"}
              />
            ))}
          <Text fontSize="xs" color="gray.500">
            ({rating})
          </Text>
        </HStack>

        {/* Precio */}
        <Flex align="center" justify="center" gap={2}>
          {isOnSale && originalPrice && (
            <Text
              color="gray.500"
              fontSize="sm"
              as="s"
            >
              ${originalPrice}
            </Text>
          )}
          <Text color="blue.600" fontSize="xl" fontWeight="bold">
            ${price}
          </Text>
        </Flex>

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
          

          <MotionButton
            size="sm"
            colorScheme="orange"
            flex="1"
            onClick={handleAddToCart}
            isDisabled={stock === 0}
            whileTap={{ scale: 0.95 }} // animación PRO
          >
            Agregar al carrito
          </MotionButton>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Item;