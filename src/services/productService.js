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

export const productService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilters,
  getTotalProductsByFilterKey,
  getProductsByFiltersExceptKey,
  FILTER_CONFIG,
};

export default productService;
