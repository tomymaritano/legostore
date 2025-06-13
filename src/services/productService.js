import {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilters,
  getTotalProductsByFilterKey,
  getProductsByFiltersExceptKey,
  FILTER_CONFIG,
} from '../components/Service/asyncMock';

export const productService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilters,
  getTotalProductsByFilterKey,
  getProductsByFiltersExceptKey,
  FILTER_CONFIG,
};

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilters,
  getTotalProductsByFilterKey,
  getProductsByFiltersExceptKey,
  FILTER_CONFIG,
};

export default productService;
