import { useCallback, useState } from 'react';
import { useRevalidator } from 'react-router';

export type Pagination = {
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  skip: number;
  total: number;
  search?: string;
};

export type ResponseType<T> = {
  data?: T;
  pagination?: Pagination;
  status?: number;
  message?: string;
  error?: boolean;
  success?: boolean;
};

export function useCustomFetch() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType<any> | undefined>(
    undefined
  );
  const revalidator = useRevalidator();

  const fetchData = useCallback(
    async <T>(url: string, options?: RequestInit) => {
      setLoading(true);
      try {
        const path = `/api/v1/${url.replace(/^\//, '')}`;

        const res = await fetch(path, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options?.headers,
          },
          credentials: 'include',
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          const errorResponse: ResponseType<T> = {
            data: undefined,
            status: res.status,
            message: errorData?.message || `HTTP error! status: ${res.status}`,
            error: true,
          };
          setResponse(errorResponse);
          return errorResponse;
        }

        const data = await res.json();
        const successResponse: ResponseType<T> = {
          data: data.data,
          status: res.status,
          message: data.message,
          error: data.error,
        };
        setResponse(successResponse);

        // Revalidate the route to ensure fresh data
        revalidator.revalidate();

        return successResponse;
      } catch (error) {
        const errorResponse: ResponseType<T> = {
          data: undefined,
          status: undefined,
          message:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
          error: true,
        };
        setResponse(errorResponse);
        return errorResponse;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchData, response, loading, setLoading };
}
