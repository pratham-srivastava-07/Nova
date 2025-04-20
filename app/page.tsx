import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import WalletDashboard from '@/components/dashboard';
import WelcomeSection from '@/components/welcome';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
      {session ? (
        <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
          <WalletDashboard />
        </Suspense>
      ) : (
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center">
          <WelcomeSection />
        </div>
      )}
    </main>
  );
}
