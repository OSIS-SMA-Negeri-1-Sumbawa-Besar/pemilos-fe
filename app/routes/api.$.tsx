import type { ActionFunction, LoaderFunction } from 'react-router';
import { ENV } from '~/lib/env';

// Helper to build headers
function buildHeaders(request: Request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Cookie: cookieHeader,
    referer: request.headers.get('referer') || '',
    ...request.headers,
  };
}

// Handle GET requests
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let path = `${url.pathname}${url.search}`;

  // Clean path if starts with /api/v1
  if (path.startsWith('/api/v1/')) {
    path = path.replace('/api/v1/', '');
  }

  let realApiResponse;
  try {
    realApiResponse = await fetch(`${ENV.BACKEND_URL}/api/v1/${path}`, {
      headers: buildHeaders(request),
      credentials: 'include',
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Failed to fetch data from real API',
        details: error instanceof Error ? error.message : error,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  let data;
  try {
    data = await realApiResponse.json();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Failed to parse response as JSON',
        details: error instanceof Error ? error.message : error,
        status: realApiResponse.status,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  if (!realApiResponse.ok) {
    console.log(
      'Failed to fetch data from real API:',
      request.url,
      realApiResponse.status
    );
    return new Response(
      JSON.stringify({
        error: true,
        message: data && data.message ? data.message : 'Failed to fetch data',
        status: realApiResponse.status,
      }),
      {
        status: realApiResponse.status,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

// Handle POST, PUT, DELETE, etc.
export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  let path = `${url.pathname}${url.search}`;

  // Clean path if starts with /api/v1
  if (path.startsWith('/api/v1/')) {
    path = path.replace('/api/v1/', '');
  }

  let body = undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.json();
    } catch {}
  }

  const fetchUrl = path.startsWith('/api/v1/')
    ? `${ENV.BACKEND_URL}${path}`
    : `${ENV.BACKEND_URL}/api/v1/${path}`;

  let realApiResponse;
  try {
    realApiResponse = await fetch(fetchUrl, {
      method: request.method,
      headers: buildHeaders(request),
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Failed to fetch data from real API',
        details: error instanceof Error ? error.message : error,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  let data;
  try {
    data = await realApiResponse.json();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Failed to parse response as JSON',
        details: error instanceof Error ? error.message : error,
        status: realApiResponse.status,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  if (!realApiResponse.ok) {
    return new Response(
      JSON.stringify({
        error: true,
        message: data && data.message ? data.message : 'Failed to fetch data',
        status: realApiResponse.status,
      }),
      {
        status: realApiResponse.status,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
