// src/reducers/__tests__/wishlistReducer.test.js
import wishlistReducer, { wishlistInitialState } from '../wishlistReducer';

describe('wishlistReducer', () => {
  it('debería devolver el estado inicial', () => {
    const action = { type: '@@INIT' };
    const result = wishlistReducer(undefined, action);
    expect(result).toEqual(wishlistInitialState);
  });

  it('debería agregar un ítem al wishlist', () => {
    const action = {
      type: 'ADD_TO_WISHLIST',
      payload: { id: 1, name: 'Producto A' },
    };
    const state = wishlistInitialState;
    const result = wishlistReducer(state, action);
    expect(result.wishlist).toHaveLength(1);
    expect(result.wishlist[0].id).toBe(1);
  });

  it('debería remover un ítem del wishlist', () => {
    const state = {
      wishlist: [{ id: 1, name: 'Producto A' }],
    };
    const action = {
      type: 'REMOVE_FROM_WISHLIST',
      payload: { id: 1 },
    };
    const result = wishlistReducer(state, action);
    expect(result.wishlist).toHaveLength(0);
  });
});