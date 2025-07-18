import type { LoaderFunctionArgs } from 'react-router';
import { fetchServer } from '~/lib/fetcher.server';
import type { Candidate } from '~/types';

export async function LandingLoader({ request }: LoaderFunctionArgs) {
  // Fetch Candidate
  const candidates = await fetchServer<Candidate>('candidates', request)

  return {
    candidates: candidates.data
  };
}
