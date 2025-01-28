import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '@/components/custom/home/NavBar';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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
      <html lang="en" suppressHydrationWarning>
        <body className="font-jetbrains-mono max-h-screen antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavBar />
            <hr className="border-t border-gray-200 dark:border-gray-700" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
