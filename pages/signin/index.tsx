"use client"

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FaWallet, 
  FaEye, 
  FaEyeSlash, 
  FaLock, 
  FaEnvelope 
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        toast({
          title: 'Sign In Failed',
          description: result.error,
          variant: 'destructive'
        });
      } else {
            toast({
            title: 'Sign In Successful',
            description: 'Welcome back to Nova Wallet',
            variant: 'default'
            });
            router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

//   const handleGoogleSignIn = async () => {
//     setIsLoading(true);
//     try {
//       await signIn('google', { callbackUrl: '/dashboard' });
//     } catch (error) {
//       toast({
//         title: 'Google Sign In Failed',
//         description: 'Please try again',
//         variant: 'destructive'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FaWallet className="text-5xl text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Nova Wallet
          </CardTitle>
          <CardDescription>
            Secure your digital assets
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-12"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <div className="text-center">
              <a 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline"
                tabIndex={isLoading ? -1 : 0}
              >
                Forgot Password?
              </a>
            </div>
            
            <div className="flex items-center my-4">
              <Separator className="flex-grow" />
              <span className="px-4 text-muted-foreground text-sm">or</span>
              <Separator className="flex-grow" />
            </div>
            
            {/* <Button 
              variant="outline" 
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg 
                className="mr-2 h-5 w-5" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.45h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" 
                  fill="#4285F4"
                />
                <path 
                  d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.18-4.53H2.18v2.84C4 20.2 7.74 23 12 23z" 
                  fill="#34A853"
                />
                <path 
                  d="M5.82 14.11c-.22-.69-.35-1.43-.35-2.21s.13-1.52.35-2.21V6.85H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 5.15l2.64-2.04z" 
                  fill="#FBBC05"
                />
                <path 
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.74 1 4 3.8 2.18 6.85l3.64 2.84c.88-2.59 3.31-4.53 6.18-4.53z" 
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button> */}
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? {' '}
              <a 
                href="/signup" 
                className="text-primary hover:underline"
                tabIndex={isLoading ? -1 : 0}
              >
                Sign Up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;