import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/productService';

const parseFilters = (params) => ({
  type: params.getAll('type'),
  age: params.getAll('age'),
  theme: params.getAll('theme'),
  interests: params.getAll('interests'),
  pieces: params.getAll('pieces'),
  highlight: params.getAll('highlight'),
});

export default function useProducts({ categoryId, sortOption = 'recommended', productsPerPage = 9 } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = useState(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const { data: allProducts = [], isLoading, error } = useQuery(['products'], async () => {
    const { promise } = getProducts({ retries: 2 });
    return promise;
  }, { staleTime: 1000 * 60 * 5 });

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentPage, filters, sortOption]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((prod) => {
      if (categoryId && prod.category.toLowerCase() !== categoryId.toLowerCase()) return false;
      if (filters.type?.length && !filters.type.includes(prod.type)) return false;
      if (filters.age?.length && !filters.age.includes(prod.age)) return false;
      if (filters.theme?.length && !filters.theme.includes(prod.theme)) return false;
      if (filters.interests?.length && !filters.interests.some((i) => prod.interests.includes(i))) return false;
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

  const setPage = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete('page');
    else params.set('page', String(page));
    setSearchParams(params, { replace: true });
  };

  const setFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    ['type', 'age', 'theme', 'interests', 'pieces', 'highlight'].forEach((k) => params.delete(k));
    Object.entries(newFilters).forEach(([k, vals]) => vals.forEach((v) => params.append(k, v)));
    params.delete('page');
    setSearchParams(params);
  };

  return {
    products: allProducts,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    loading: isLoading || pageLoading,
    setPage,
    filters,
    setFilters,
    error,
  };
}
