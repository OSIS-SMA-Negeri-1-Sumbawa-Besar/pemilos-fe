import type { LoaderFunctionArgs } from 'react-router';
import { fetchServer } from '~/lib/fetcher.server';
import type { Candidate } from '~/types';

export async function VoteLoader({ request }: LoaderFunctionArgs) {
  const candidates = await fetchServer<Candidate>('candidates', request)

  return {
    candidates: candidates.data
  }
}
