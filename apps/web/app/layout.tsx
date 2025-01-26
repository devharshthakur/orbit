import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '@/components/custom/home/NavBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orbit Client',
  description: 'A Web Based Pdf Compression tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-jetbrains-mono max-h-screen antialiased">
          <NavBar />
          <hr className="border-t border-gray-200 dark:border-gray-700" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
