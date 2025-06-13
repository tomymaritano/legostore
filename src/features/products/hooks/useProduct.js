import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productService';

export default function useProduct(productId, options = {}) {
  return useQuery(
    ['product', productId],
    async () => {
      const { promise } = getProductById(productId, { retries: 2 });
      return promise;
    },
    {
      enabled: Boolean(productId),
      staleTime: 1000 * 60 * 5,
      ...options,
    }
  );
}
