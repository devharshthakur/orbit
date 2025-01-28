import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { UserButton, SignedIn } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Home } from 'lucide-react';
import React from 'react';

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-background p-4">
        <div className="flex items-center gap-4">
          <SignedIn>
            <Button variant="outline" size="icon" asChild className="mr-2">
              <Link href="/" aria-label="Home">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
          </SignedIn>
          <Button variant="outline" asChild>
            <Link href="https://github.com/devharshthakur" target="_blank" rel="noopener noreferrer">
              <FaGithub className="mr-2 h-4 w-4" />
              @devharshthakur
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
          <Button variant="outline" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="https://github.com/devharshthakur/orbit" target="_blank" rel="noopener noreferrer">
              <FaGithub className="mr-2 h-4 w-4" />
              Repo
            </Link>
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
