# Lego Store

This app is a small e‑commerce demo built with React. It showcases a catalog of Lego sets and uses Chakra UI components for styling.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Key dependencies

- **Chakra UI** – provides accessible, themeable React components used throughout the interface.
- **React Router** – handles client side routing between pages of the store.

Other dependencies include FontAwesome icons and Framer Motion for small animations. See `package.json` for the full list.

## Project structure

```
src/
  components/      # UI components only
  hooks/           # reusable hooks with business logic
  services/        # API and external interactions
  components/Service/asyncMock.js # mock data (legacy)
```

Components consume hooks and should avoid data fetching or direct business logic. Hooks use services to interact with APIs or mocks.

## Service pattern

All API calls are made through `fetchWithRetry` exposed by `src/services/apiClient.js`.
This helper provides:

1. **Error handling** – non‑OK responses throw an error with the HTTP status.
2. **Retry support** – automatic retries with exponential backoff can be configured per request.
3. **Cancellation** – each call returns a `cancel` function using `AbortController` to abort the underlying `fetch`.

Services such as `productService` wrap these helpers and expose domain specific functions:

```javascript
import { getProducts } from './services/productService';

const { promise, cancel } = getProducts({ retries: 2 });
promise.then(setProducts).catch(console.error);

// optional cleanup
cancel();
```

Components never call `fetch` directly; they consume hooks which use these services internally.

## Pagination and caching with React Query

The product catalog uses **React Query** for data fetching and local caching.
`useProducts` issues paginated requests with a stable query key so results are
cached per page and filter combination. Pagination state is kept in the URL via
`useSearchParams` and page changes show a skeleton loader while previous data
remains visible thanks to `keepPreviousData`.

`getProductsPaginated` in `productService` returns the current page of products
and the total count so the hook can compute total pages without downloading the
entire catalog.

## State management

The app keeps cart and wishlist data in React context providers. Business logic
is exposed through hooks (`useCart`, `useWishlist`) so UI components only access
what they need. Each provider memoizes its value to avoid unnecessary rerenders,
and cart and wishlist state are kept separate to further minimise updates.
