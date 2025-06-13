import {
  getProducts as mockGetProducts,
  getProductById as mockGetProductById,
  getProductsByCategory as mockGetProductsByCategory,
  getProductsByFilters as mockGetProductsByFilters,
  getTotalProductsByFilterKey as mockGetTotalProductsByFilterKey,
  getProductsByFiltersExceptKey as mockGetProductsByFiltersExceptKey,
  FILTER_CONFIG,
} from '../components/Service/asyncMock';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function abortError() {
  const err = new Error('Aborted');
  err.name = 'AbortError';
  return err;
}

function wrapRequest(fn, { retries = 0, retryDelay = 300 } = {}) {
  const controller = new AbortController();
  let aborted = false;
  controller.signal.addEventListener('abort', () => {
    aborted = true;
  });

  const attempt = async (n = 0) => {
    try {
      if (aborted) throw abortError();
      const res = await fn();
      if (aborted) throw abortError();
      return res;
    } catch (err) {
      if (aborted) throw abortError();
      if (n < retries) {
        await delay(retryDelay * (n + 1));
        return attempt(n + 1);
      }
      throw err;
    }
  };

  const promise = attempt();
  return { promise, cancel: () => controller.abort() };
}

export const getProducts = (opts) => wrapRequest(() => mockGetProducts(), opts);

export const getProductById = (id, opts) =>
  wrapRequest(() => mockGetProductById(id), opts);

export const getProductsByCategory = (category, opts) =>
  wrapRequest(() => mockGetProductsByCategory(category), opts);

export const getProductsByFilters = (filters, opts) =>
  wrapRequest(() => mockGetProductsByFilters(filters), opts);

export const getTotalProductsByFilterKey = (key, products, opts) =>
  wrapRequest(() => mockGetTotalProductsByFilterKey(key, products), opts);

export const getProductsByFiltersExceptKey = (filters, exceptKey, products, opts) =>
  wrapRequest(() => mockGetProductsByFiltersExceptKey(filters, exceptKey, products), opts);

function applyFilters(list, { categoryId, filters = {} } = {}) {
  return list.filter((prod) => {
    if (categoryId && prod.category.toLowerCase() !== categoryId.toLowerCase()) return false;
    if (filters.type?.length && !filters.type.includes(prod.type)) return false;
    if (filters.age?.length && !filters.age.includes(prod.age)) return false;
    if (filters.theme?.length && !filters.theme.includes(prod.theme)) return false;
    if (filters.interests?.length && !filters.interests.some((i) => prod.interests.includes(i))) return false;
    if (filters.pieces?.length && !filters.pieces.includes(prod.pieces)) return false;
    if (filters.highlight?.length && !filters.highlight.includes(prod.highlight)) return false;
    return true;
  });
}

function applySort(list, sortOption) {
  const sorted = [...list];
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
}

export const getProductsPage = (
  page = 1,
  limit = 9,
  { categoryId, filters = {}, sortOption } = {},
  opts,
) =>
  wrapRequest(async () => {
    const all = await mockGetProducts();
    const filtered = applyFilters(all, { categoryId, filters });
    const sorted = applySort(filtered, sortOption);
    const start = (page - 1) * limit;
    const items = sorted.slice(start, start + limit);
    return {
      items,
      totalFiltered: sorted.length,
      total: all.length,
    };
  }, opts);

export const productService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilters,
  getTotalProductsByFilterKey,
  getProductsByFiltersExceptKey,
  getProductsPage,
  FILTER_CONFIG,
};

export default productService;

