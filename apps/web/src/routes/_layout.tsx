import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Header } from './-component';

const RootLayout = () => (
  <div className='container max-w-[1000px] m-auto px-4 overflow-hidden'>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  </div>
);

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
});
