import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/productService';

export default function useProducts({
  categoryId,
  filters,
  sortOption,
  currentPage,
  productsPerPage,
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { promise, cancel } = getProducts({ retries: 2 });
    setLoading(true);
    promise
      .then((data) => {
        setAllProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
    return cancel;
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((prod) => {
      if (categoryId && prod.category.toLowerCase() !== categoryId.toLowerCase()) {
        return false;
      }
      if (filters.type?.length && !filters.type.includes(prod.type)) return false;
      if (filters.age?.length && !filters.age.includes(prod.age)) return false;
      if (filters.theme?.length && !filters.theme.includes(prod.theme)) return false;
      if (
        filters.interests?.length &&
        !filters.interests.some((interest) => prod.interests.includes(interest))
      )
        return false;
      if (filters.pieces?.length && !filters.pieces.includes(prod.pieces)) return false;
      if (filters.highlight?.length && !filters.highlight.includes(prod.highlight)) return false;
      return true;
    });
  }, [allProducts, categoryId, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price_low_high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high_low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(start, start + productsPerPage);
  }, [sortedProducts, currentPage, productsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(sortedProducts.length / productsPerPage),
    [sortedProducts, productsPerPage]
  );

  return {
    products: allProducts,
    filteredProducts,
    sortedProducts,
    paginatedProducts,
    totalPages,
    loading,
    error,
  };
}
