import { Outlet } from 'react-router';

export default function PageLayout() {
  return (
    <main className="">
      <div className="max-w-[1920px] relative mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
