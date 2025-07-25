import { Outlet, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Background } from '~/components/elements/Background/background';
import { BottomBar } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { getUserFromRequest, type Session } from '~/lib/auth.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await getUserFromRequest(args.request);

  return user;
}

export default function PageLayout() {
  const user = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="max-w-[1920px] relative mx-auto">
        <Background />
        <Navbar
          user={user as Session}
        />
        <Outlet context={user} />
        <BottomBar />
      </div>
    </main>
  );
}
