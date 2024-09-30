import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type HttpMethods = 'POST' | 'PATCH' | 'DELETE'

interface CustomMutationOptions<TData, TError, TVariables> {
  headers?: Record<string, string>;
  mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export function useMutationAPI<TData = unknown, TError = unknown, TVariables = unknown>(
  endpoint: string, 
  method: HttpMethods = 'POST', 
  options: CustomMutationOptions<TData, TError, TVariables> = {}
) {

  return useMutation({
    mutationFn: async (body: TVariables) => {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error("Wa mugana ang API");
      }

      return response.json();
    }
  })
}

export default useMutationAPI;