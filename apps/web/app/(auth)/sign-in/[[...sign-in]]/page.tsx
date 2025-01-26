import { SignIn } from '@clerk/nextjs';
import React from 'react';

function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <SignIn />
    </main>
  );
}

export default Page;
