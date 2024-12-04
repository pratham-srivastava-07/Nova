import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import WalletDashboard from '@/components/dashboard';
import WelcomeSection from '@/components/welcome';
import AuthButtons from '@/components/buttons/auth-buttons';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
        Welcome to Nova, your own web-based wallet
      </h1>

      {session ? (
        <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
          <WalletDashboard />
        </Suspense>
      ) : (
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center">
          <WelcomeSection />
          <AuthButtons />
        </div>
      )}
    </main>
  );
}
