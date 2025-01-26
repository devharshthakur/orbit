import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-background p-4">
        <div>
          <Button variant="outline" asChild>
            <Link href="https://github.com/devharshthakur" target="_blank" rel="noopener noreferrer">
              <FaGithub className="mr-2 h-4 w-4" />
              @devharshthakur
            </Link>
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">About</Button>
          <Button variant="default" asChild>
            <Link href="https://github.com/devharshthakur/orbit" target="_blank" rel="noopener noreferrer">
              <FaGithub className="mr-2 h-4 w-4" />
              Repo
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
