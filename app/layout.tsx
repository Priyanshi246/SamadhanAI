import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { LanguageProvider } from '@/lib/language-context';
import { DemoProvider } from '@/lib/demo-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Samadhan AI — From Problems to Solutions. From Solutions to Impact.',
  description:
    'An AI-powered platform that transforms community problems into actionable challenges and connects them with universities, innovators, industry and CSR partners to create measurable real-world impact.',
  openGraph: {
    title: 'Samadhan AI',
    description:
      'From Problems to Solutions. From Solutions to Impact.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoProvider>
          <LanguageProvider>
            <div className="relative min-h-screen flex flex-col bg-background">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
