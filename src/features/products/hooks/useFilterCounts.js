import { useEffect, useState } from 'react';
import {
  getProductsByFiltersExceptKey,
  getTotalProductsByFilterKey,
  FILTER_CONFIG,
} from '../services/productService';

export default function useFilterCounts(filters, products) {
  const [countsByFilterKey, setCountsByFilterKey] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const newCounts = {};
      for (const filter of FILTER_CONFIG) {
        const { promise: subListPromise, cancel: cancelSub } =
          getProductsByFiltersExceptKey(filters, filter.key, products);
        const subList = await subListPromise;
        const { promise: countsPromise, cancel: cancelCounts } =
          getTotalProductsByFilterKey(filter.key, subList);
        const counts = await countsPromise;
        cancelCounts();
        cancelSub();
        newCounts[filter.key] = counts;
      }
      setCountsByFilterKey(newCounts);
    };
    if (Array.isArray(products)) {
      fetchCounts();
    }
  }, [filters, products]);

  return countsByFilterKey;
}
