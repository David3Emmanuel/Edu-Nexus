const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

async function fetcher(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || 'An error occurred while fetching the data.');
  }
  return response.json();
}

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export async function get(path: string, params?: Record<string, any>, options?: RequestInit) {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  return await fetcher(url.toString(), options);
}

export async function post(path: string, data: any, options?: RequestInit) {
  const requestUrl = getStrapiURL(`/api${path}`);
  return await fetcher(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify({ data }),
    ...options,
  });
}

export function formatStrapiData(item: any) {
    if (!item) return null;
    const { id, attributes } = item;
    return { id, ...attributes };
}

export function formatStrapiCollection(items: any[]) {
    if (!items) return [];
    return items.map(formatStrapiData);
}
