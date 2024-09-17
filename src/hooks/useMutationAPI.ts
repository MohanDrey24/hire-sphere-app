import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type HttpMethods = 'POST' | 'PATCH' | 'DELETE'

interface CustomMutationOptions<TData, TError, TVariables> {
  headers?: Record<string, string>;
  mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
}

const BASE_URL: string = 'http://localhost:4000'

export function useMutationAPI<TData = unknown, TError = unknown, TVariables = unknown>(
  endpoint: string, 
  method: HttpMethods = 'POST', 
  options: CustomMutationOptions<TData, TError, TVariables> = {}
) {

  const { headers = {}, mutationOptions = {}} = options
  return useMutation({
    mutationFn: async (body) => {
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