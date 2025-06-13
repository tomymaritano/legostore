export async function fetchWithRetry(url, options = {}, { retries = 0, retryDelay = 300 } = {}) {
  const controller = new AbortController();
  const fetchOptions = { ...options, signal: controller.signal };

  const attemptRequest = async (attempt = 0) => {
    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        const error = new Error(`HTTP error ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        throw err;
      }
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, retryDelay * (attempt + 1)));
        return attemptRequest(attempt + 1);
      }
      throw err;
    }
  };

  const promise = attemptRequest();
  return { promise, cancel: () => controller.abort() };
}

export default { fetchWithRetry };
