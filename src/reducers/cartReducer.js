export const initialCartState = [];

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        return state.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: (Number(prod.quantity) || 0) + quantity }
            : prod
        );
      }
      return [...state, { ...item, quantity }];
    }
    case 'INCREASE_QUANTITY': {
      const id = action.payload;
      return state.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((Number(item.quantity) || 1) + 1, 1) }
          : item
      );
    }
    case 'DECREASE_QUANTITY': {
      const id = action.payload;
      return state.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((Number(item.quantity) || 1) - 1, 1) }
          : item
      );
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}
