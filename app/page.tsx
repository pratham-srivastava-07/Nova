import { Suspense } from 'react'

import { getServerSession } from 'next-auth/next'
import WalletDashboard from '@/components/dashboard'
import WelcomeSection from '@/components/welcome'
import AuthButtons from '@/components/buttons/auth-buttons'


export default async function Home() {
  const session = await getServerSession()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Nova, your own web-based wallet</h1>
      
      {session ? (
        <Suspense fallback={<div>Loading...</div>}>
          <WalletDashboard />
        </Suspense>
      ) : (
        <>
          <WelcomeSection />
          <AuthButtons />
        </>
      )}
    </main>
  )
}

