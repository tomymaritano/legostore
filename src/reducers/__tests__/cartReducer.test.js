import { cartReducer, initialCartState } from '../cartReducer';

describe('cartReducer', () => {
  it('debería retornar el estado inicial', () => {
    const result = cartReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialCartState);
  });

  it('debería agregar un nuevo ítem al carrito', () => {
    const action = {
      type: 'ADD_ITEM',
      payload: { item: { id: 1, name: 'Producto A' }, quantity: 2 },
    };
    const result = cartReducer([], action);
    expect(result).toEqual([{ id: 1, name: 'Producto A', quantity: 2 }]);
  });

  it('debería aumentar la cantidad de un ítem existente', () => {
    const initialState = [{ id: 1, name: 'Producto A', quantity: 2 }];
    const action = {
      type: 'ADD_ITEM',
      payload: { item: { id: 1, name: 'Producto A' }, quantity: 3 },
    };
    const result = cartReducer(initialState, action);
    expect(result[0].quantity).toBe(5);
  });

  it('debería aumentar la cantidad con INCREASE_QUANTITY', () => {
    const initialState = [{ id: 1, quantity: 2 }];
    const action = { type: 'INCREASE_QUANTITY', payload: 1 };
    const result = cartReducer(initialState, action);
    expect(result[0].quantity).toBe(3);
  });

  it('debería disminuir la cantidad con DECREASE_QUANTITY, mínimo 1', () => {
    const initialState = [{ id: 1, quantity: 1 }];
    const action = { type: 'DECREASE_QUANTITY', payload: 1 };
    const result = cartReducer(initialState, action);
    expect(result[0].quantity).toBe(1); // no baja de 1
  });

  it('debería eliminar un ítem con REMOVE_ITEM', () => {
    const initialState = [{ id: 1, quantity: 2 }];
    const action = { type: 'REMOVE_ITEM', payload: 1 };
    const result = cartReducer(initialState, action);
    expect(result).toEqual([]);
  });

  it('debería limpiar el carrito con CLEAR_CART', () => {
    const initialState = [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }];
    const action = { type: 'CLEAR_CART' };
    const result = cartReducer(initialState, action);
    expect(result).toEqual([]);
  });
});