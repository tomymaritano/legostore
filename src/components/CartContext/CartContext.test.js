// CartContext.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCartContext } from './CartContext';

const CartTestComponent = () => {
  const {
    cart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    totalQuantity,
    totalPrice,
    isInCart,
  } = useCartContext();

  return (
    <div>
      <button onClick={() => addItem({ id: '1', name: 'Test', price: 10 }, 2)}>Add</button>
      <button onClick={() => increaseQuantity('1')}>Increase</button>
      <button onClick={() => decreaseQuantity('1')}>Decrease</button>
      <button onClick={() => removeItem('1')}>Remove</button>
      <button onClick={clearCart}>Clear</button>

      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="cart-qty">{cart[0]?.quantity || 0}</div>
      <div data-testid="total-qty">{totalQuantity}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <div data-testid="is-in-cart">{isInCart('1') ? 'yes' : 'no'}</div>
    </div>
  );
};

const setup = () =>
  render(
    <CartProvider>
      <CartTestComponent />
    </CartProvider>
  );