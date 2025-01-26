'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HomePage() {
  const { isSignedIn } = useAuth();

  return (
    <main className="flex max-h-screen flex-col items-center justify-center bg-background pt-96">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Orbit</h1>
      {isSignedIn ? (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/upload">Get Started</Link>
          </Button>
          <Button asChild variant={'outline'}>
            <SignOutButton />
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
