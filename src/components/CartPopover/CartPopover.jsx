import {
  Box,
  IconButton,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  VStack,
  Text,
  Divider,
  useDisclosure,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";

const CartPopover = ({ onOpenDrawer }) => {
  const { cart, totalQuantity, total } = useContext(CartContext);
  const [bumpClass, setBumpClass] = useState("");

  const {
    isOpen: isPopoverOpen,
    onOpen: onOpenPopover,
    onClose: onClosePopover,
  } = useDisclosure();

  useEffect(() => {
    if (totalQuantity === 0) return;
    setBumpClass("cart-bump");

    const timer = setTimeout(() => {
      setBumpClass("");
    }, 300);

    return () => clearTimeout(timer);
  }, [totalQuantity]);

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpen={onOpenPopover}
      onClose={onClosePopover}
      trigger="hover"
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Box position="relative" cursor="pointer">
          <IconButton
            icon={<FaShoppingBag />}
            aria-label="Carrito"
            variant="ghost"
            size="md"
          />
          {totalQuantity > 0 && (
            <Badge
              colorScheme="green"
              borderRadius="full"
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              px={1.5}
              className={bumpClass}
            >
              {totalQuantity}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w="320px" zIndex="popover">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Resumen del carrito</PopoverHeader>
        <PopoverBody>
          {totalQuantity === 0 ? (
            <Text>No hay items en el carrito.</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {cart.slice(0, 3).map((item) => (
                <Box key={item.id}>
                  <HStack spacing={3}>
                    <Image
                      src={item.image || item.img} // soporta ambos nombres
                      alt={item.name}
                      boxSize="50px"
                      objectFit="contain"
                      borderRadius="md"
                      bg="gray.50"
                    />
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                        {item.name} x {item.quantity}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Subtotal: ${item.quantity * item.price}
                      </Text>
                    </Box>
                  </HStack>
                  <Divider mt={2} />
                </Box>
              ))}
              {cart.length > 3 && (
                <Text fontSize="sm" color="gray.500">
                  + {cart.length - 3} items más
                </Text>
              )}
            </VStack>
          )}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">Total: ${total}</Text>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => {
              onClosePopover();    // cerrás el Popover
              onOpenDrawer();      // abrís el Drawer
            }}
          >
            Ver carrito
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;