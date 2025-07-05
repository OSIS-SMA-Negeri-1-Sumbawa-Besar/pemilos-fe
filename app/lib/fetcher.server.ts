import { ENV } from './env';
import type { ResponseType } from './fetcher.client';

export const fetchServer = async <T>(
  url: string,
  request: Request,
  options?: RequestInit
): Promise<ResponseType<T>> => {
  const fetchUrl = `${ENV.BACKEND_URL}/api/v1/${url}`;

  try {
    const response = await fetch(fetchUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: request.headers.get('Cookie') || '',
        ...options?.headers,
      },
      credentials: 'include',
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: undefined,
        status: response.status,
        message:
          responseData?.message || `HTTP error! status: ${response.status}`,
        error: true,
      };
    }
    return {
      data: responseData.data as T,
      pagination: responseData.pagination,
      status: response.status,
      message: responseData.message,
      error: responseData.error,
      success: responseData.success,
    };
  } catch (error: any) {
    return {
      data: undefined,
      status: 500,
      message: error?.message || 'Unknown error occurred',
      error: true,
    };
  }
};
