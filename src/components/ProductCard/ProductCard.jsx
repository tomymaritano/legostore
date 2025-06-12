import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Badge,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useLocation, Link as RouterLink } from "react-router-dom";

const MotionBox = motion(Box);

const ProductCard = ({ id, name, price, image, stock, category, description, isNew, isOnSale }) => {
  const { addItem, cart } = useContext(CartContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleAddToCart = () => {
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
      addItem({ id, name, price }, 1);

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

  const handleViewDetail = () => {
    onOpen();
  };

  return (
    <MotionBox
      whileHover="hover"
      initial="rest"
      animate="rest"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      bg="white"
      position="relative"
      role="group"
    >
      <Box>
        <Box position="relative" overflow="hidden">
          {/* Link con backgroundLocation → esto es CLAVE */}
          <Box
            as={RouterLink}
            to={`/item/${id}`}
            state={{ backgroundLocation: location }}
            onClick={(e) => {
              if (!isMobile) {
                e.preventDefault(); // Desktop → abrir Modal
                handleViewDetail();
              }
              // Mobile → deja navegar normal
            }}
          >
            {/* Badges */}
            {isNew && (
              <Badge
                position="absolute"
                top={2}
                left={2}
                colorScheme="teal"
                borderRadius="full"
                px={2}
                py={1}
                fontSize="xs"
                textTransform="uppercase"
                zIndex="overlay"
              >
                New
              </Badge>
            )}
            {isOnSale && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                colorScheme="orange"
                borderRadius="full"
                px={2}
                py={1}
                fontSize="xs"
                textTransform="uppercase"
                zIndex="overlay"
              >
                Sale
              </Badge>
            )}

            <MotionBox whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
              <Image
                src={image}
                alt={name}
                w="100%"
                h="250px"
                objectFit="contain"
                bg="white"
              />
            </MotionBox>
          </Box>
        </Box>
      </Box>

      <Stack p={4} spacing={2} textAlign="center">
        <Heading as="h3" size="md" noOfLines={1}>
          {name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="teal.600">
          ${price}
        </Text>
      </Stack>

      {/* Overlay buttons */}
      <MotionBox
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        height="0"
        bg="rgba(0, 0, 0, 0.6)"
        opacity="0"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        transition="all 0.3s ease"
        _groupHover={{
          height: "100%",
          opacity: 1,
          cursor: "pointer",
        }}
        px={4}
        py={4}
        gap={3}
      >
        <Button
          colorScheme="teal"
          size="md"
          w="80%"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          isDisabled={stock === 0}
        >
          Agregar al carrito
        </Button>
        <Button
          variant="outline"
          colorScheme="whiteAlpha"
          size="md"
          w="80%"
          onClick={(e) => {
            e.preventDefault();
            handleViewDetail();
          }}
        >
          Ver detalle
        </Button>
      </MotionBox>

      {/* Modal con ItemDetail */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ItemDetail
              id={id}
              name={name}
              img={image}
              price={price}
              stock={stock}
              description={description}
              category={category}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
};

export default ProductCard;