'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AuthButtons() {
  const router = useRouter()

  return (
    <div className="flex justify-center space-x-4">
      <Button onClick={() => router.push('/signup')}>Sign Up</Button>
      <Button onClick={() => router.push('/login')} variant="outline">Log In</Button>
    </div>
  )
}

