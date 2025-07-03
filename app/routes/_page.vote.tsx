import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { VoteModule } from '~/modules/VoteModule';
import { VoteAction } from '~/modules/VoteModule/action';
import { VoteLoader } from '~/modules/VoteModule/loader';

export async function loader(args: LoaderFunctionArgs) {
  return VoteLoader(args);
}

export async function action(args: ActionFunctionArgs) {
  return VoteAction(args);
}

export default function VotePage() {
  return <VoteModule />;
}
