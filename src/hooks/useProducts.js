import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsPaginated } from '../services/productService';

export default function useProducts({ categoryId, sortOption, productsPerPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseFiltersFromParams = useCallback(
    () => ({
      type: searchParams.getAll('type'),
      age: searchParams.getAll('age'),
      theme: searchParams.getAll('theme'),
      interests: searchParams.getAll('interests'),
      pieces: searchParams.getAll('pieces'),
      highlight: searchParams.getAll('highlight'),
    }),
    [searchParams]
  );

  const [filters, setFiltersState] = useState(parseFiltersFromParams);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFiltersState(parseFiltersFromParams());
  }, [parseFiltersFromParams]);

  const setFilters = (newFilters) => {
    setFiltersState(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach((v) => params.append(key, v));
    });
    setSearchParams(params, { replace: true });
    setPage(1);
  };

  const { data, isLoading, isFetching } = useQuery(
    ['products', categoryId, filters, sortOption, page],
    () =>
      getProductsPaginated({
        page,
        limit: productsPerPage,
        categoryId,
        filters,
        sortOption,
      }).promise,
    { keepPreviousData: true }
  );

  const products = data?.products ?? [];
  const totalPages = data ? Math.ceil(data.total / productsPerPage) : 0;

  return {
    products,
    totalPages,
    isLoading,
    isFetching,
    filters,
    setFilters,
    page,
    setPage,
  };
}
