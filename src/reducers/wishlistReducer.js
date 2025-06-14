export const initialWishlistState = [];

export function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const exists = state.some((i) => i.id === item.id);
      if (exists) return state;
      return [...state, item];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_WISHLIST':
      return [];
    default:
      return state;
  }
}
