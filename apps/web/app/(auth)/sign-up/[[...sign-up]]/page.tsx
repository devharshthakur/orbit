import { SignUp } from '@clerk/nextjs';
import React from 'react';

function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}

export default Page;
