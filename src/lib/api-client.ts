type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | FormData | null;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"],
): string {
  // If no params are provided, return the original URL
  if (!params) return url;

  // Filter out undefined and null values from the params object
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );

  // If no valid params remain after filtering, return the original URL
  if (Object.keys(filteredParams).length === 0) return url;

  // Convert the filtered params to a URL-encoded query string
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();

  // Combine the original URL with the query string
  return `${url}?${queryString}`;
}

export function getServerSideCookies() {
  // Prevents running on client-side by checking window object
  if (typeof window !== "undefined") return "";

  // Dynamically import next/headers only on server-side
  return import("next/headers").then(({ cookies }) => {
    try {
      const cookieStore = cookies();
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
    } catch (error) {
      console.error("Failed to access cookies", error);
      return "";
    }
  });
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    next,
  } = options;

  let cookieHeader = cookie;
  if (typeof window !== undefined && !cookie) {
    cookieHeader = await getServerSideCookies();
  }

  const fullUrl = buildUrlWithParams(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    params,
  );

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...headers,
      // dont know if this is needed
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache,
    next,
  });

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(
    url: string,
    body?: RequestOptions["body"],
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(
    url: string,
    body?: RequestOptions["body"],
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(
    url: string,
    body?: RequestOptions["body"],
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
