import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getUserFromRequest } from '~/lib/auth.server';
import { fetchServer } from '~/lib/fetcher.server';
import type { Candidate } from '~/types';

export async function VoteLoader({ request }: LoaderFunctionArgs) {

  const user = await getUserFromRequest(request);

  if (!user) {
    return redirect('/login');
  }

  const candidates = await fetchServer<Candidate>('candidates', request)

  return {
    candidates: candidates.data
  }
}
