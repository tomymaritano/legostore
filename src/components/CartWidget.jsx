import Cart from "./assets/images/shopping-cart-outline.svg";
import { Box } from "@chakra-ui/react";

const CartWidget = () => {
  return (
    <Box>
      <img src={Cart} alt="Cart" width={20}/>
    </Box>
  );
};

export default CartWidget;
