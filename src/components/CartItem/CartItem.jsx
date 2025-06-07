import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";

const CartItem = ({ id, name, price, quantity }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <div>
      <h4>{name}</h4>
      <p>Cantidad: {quantity}</p>
      <p>Precio unidad: ${price}</p>
      <p>Subtotal: ${price * quantity}</p>
      <button onClick={() => removeItem(id)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
