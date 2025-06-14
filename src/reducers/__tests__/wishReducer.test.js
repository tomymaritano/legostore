// src/reducers/__tests__/wishlistReducer.test.js
import wishlistReducer, { wishlistInitialState } from '../wishlistReducer';

describe('wishlistReducer', () => {
  describe('acción por defecto', () => {
    it('debería devolver el estado inicial', () => {
      const action = { type: '@@INIT' };
      const result = wishlistReducer(undefined, action);
      expect(result).toEqual(wishlistInitialState);
    });
  });

  describe('ADD_TO_WISHLIST', () => {
    it('debería agregar un ítem al wishlist', () => {
      const action = {
        type: 'ADD_TO_WISHLIST',
        payload: { id: 1, name: 'Producto A' },
      };
      const result = wishlistReducer(wishlistInitialState, action);
      expect(result.wishlist).toHaveLength(1);
      expect(result.wishlist[0]).toEqual({ id: 1, name: 'Producto A' });
    });

    it('debería evitar duplicados si ya existe el producto', () => {
      const state = {
        wishlist: [{ id: 1, name: 'Producto A' }],
      };
      const action = {
        type: 'ADD_TO_WISHLIST',
        payload: { id: 1, name: 'Producto A' },
      };
      const result = wishlistReducer(state, action);
      expect(result.wishlist).toHaveLength(1); // No duplica
    });
  });

  describe('REMOVE_FROM_WISHLIST', () => {
    it('debería remover un ítem existente', () => {
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

    it('debería dejar el estado igual si el ítem no existe', () => {
      const state = {
        wishlist: [{ id: 2, name: 'Producto B' }],
      };
      const action = {
        type: 'REMOVE_FROM_WISHLIST',
        payload: { id: 99 },
      };
      const result = wishlistReducer(state, action);
      expect(result.wishlist).toEqual(state.wishlist);
    });
  });

  describe('inmutabilidad', () => {
    it('no debería mutar el estado original', () => {
      const state = {
        wishlist: [{ id: 1, name: 'Producto A' }],
      };
      const action = {
        type: 'REMOVE_FROM_WISHLIST',
        payload: { id: 1 },
      };
      const result = wishlistReducer(state, action);
      expect(result).not.toBe(state); // referencia distinta
      expect(state.wishlist).toHaveLength(1); // estado original intacto
    });
  });
});