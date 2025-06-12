import { CartContext } from "../CartContext/CartContext";
import { useContext, useEffect, useState } from "react";
import { Box, Image, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import cart from "../assets/images/shopping-cart-outline.svg";

const MotionBadge = motion(Badge);

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  const [bumpClass, setBumpClass] = useState("");

  useEffect(() => {
    if (totalQuantity === 0) return;
    setBumpClass("cart-bump");

    const timer = setTimeout(() => {
      setBumpClass("");
    }, 300);

    return () => clearTimeout(timer);
  }, [totalQuantity]);

  if (totalQuantity === 0) return null;

  return (
    <Box position="relative" display="inline-block">
      <Image src={cart} alt="Cart" boxSize="30px" />
      <MotionBadge
        colorScheme="green"
        borderRadius="full"
        position="absolute"
        top="-1"
        right="-2"
        fontSize="0.7em"
        px={1.5}
        className={bumpClass} // si querés usar la animación bump
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        {totalQuantity}
      </MotionBadge>
    </Box>
  );
};

export default CartWidget;