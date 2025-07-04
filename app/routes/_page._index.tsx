import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { Background } from '~/components/ui/backgorund';
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
    <div className='max-w-[1920px]'>
      <Background />
      <Navbar />
      <main className="px-10 lg:px-40 flex flex-col gap-10 overflow-hidden min-h-screen">
        <LandingModule />
      </main>
    </div>
  )
}
