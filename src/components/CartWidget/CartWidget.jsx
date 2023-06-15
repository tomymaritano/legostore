import Cart from "../assets/images/shopping-cart-outline.svg";
import { Box } from "@chakra-ui/react";
import { CartContext } from "../CartContext/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Box display={"flex"}>
      <img src={Cart} alt="Cart" width={20} /> 0
    </Box>
  );
};

export default CartWidget;
