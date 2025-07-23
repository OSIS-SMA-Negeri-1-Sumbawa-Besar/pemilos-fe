import type { ActionFunctionArgs } from 'react-router';
import { fetchServer } from '~/lib/fetcher.server';

export async function VoteAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const candidateCode = formData.get('candidateCode') as string;
    const voteToken = formData.get('voteToken') as string;

    if (!candidateCode || !voteToken) {
      return {
        success: false,
        message: 'Candidate code dan vote token harus diisi'
      };
    }

    const response = await fetchServer('votes', request, {
      method: 'POST',
      body: JSON.stringify({
        candidateCode,
        voteToken
      }),
    });

    if (response.error) {
      return {
        success: false,
        message: response.message || 'Gagal mengirim vote'
      };
    }

    return {
      success: true,
      message: 'Vote berhasil dikirim!'
    };

  } catch (error) {
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengirim vote'
    };
  }
}