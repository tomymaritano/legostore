import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/productService';

export default function useSearchProducts(query, options = {}) {
  return useQuery(
    ['search', query],
    async () => {
      const { promise } = getProducts({ retries: 2 });
      const all = await promise;
      const q = (query || '').toLowerCase();
      return all.filter((prod) => prod.name.toLowerCase().includes(q));
    },
    {
      staleTime: 1000 * 60 * 5,
      ...options,
    }
  );
}
