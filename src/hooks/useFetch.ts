const useFetch = async <T>(endpoint: string, method?: string): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    credentials: 'include',
    method,
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
};

export default useFetch;
