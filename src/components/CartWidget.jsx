import Cart from "./assets/images/shopping-cart-outline.svg";
import { Box } from "@chakra-ui/react";

const CartWidget = () => {
  return (
    <Box display={"flex"}>
      <img src={Cart} alt="Cart" width={20}/> 0
    </Box>
  );
};

export default CartWidget;
