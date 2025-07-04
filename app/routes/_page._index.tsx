import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { Background } from '~/components/elements/Background/background';
import { Navbar } from '~/components/ui/navbar';
import { LandingModule } from '~/modules/LandingModule';
import { LandingAction } from '~/modules/LandingModule/action';
import { LandingLoader } from '~/modules/LandingModule/loader';

export async function loader(args: LoaderFunctionArgs) {
  return LandingLoader(args);
}

export async function action(args: ActionFunctionArgs) {
  return LandingAction(args);
}

export default function LandingPage() {
  return (
    <div className="">
      <Background />
      <Navbar />
      <main className="px-10 lg:px-40 flex flex-col gap-10 overflow-hidden">
        <LandingModule />
      </main>
    </div>
  );
}
