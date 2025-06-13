import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsPaginated } from '../services/productService';

export default function useProducts({ categoryId, sortOption, productsPerPage = 9 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseFilters = () => ({
    type: searchParams.getAll('type'),
    age: searchParams.getAll('age'),
    theme: searchParams.getAll('theme'),
    interests: searchParams.getAll('interests'),
    pieces: searchParams.getAll('pieces'),
    highlight: searchParams.getAll('highlight'),
  });

  const [filters, setFilters] = useState(parseFilters());
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));

  useEffect(() => {
    setFilters(parseFilters());
    setPage(Number(searchParams.get('page') || 1));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((val) => params.append(key, val));
    });
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [filters, page, setSearchParams]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

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
    {
      keepPreviousData: true,
    }
  );

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / productsPerPage);

  return {
    products,
    total,
    totalPages,
    page,
    setPage,
    filters,
    setFilters,
    isLoading,
    isFetching,
  };
}
