import { LanguageProvider } from '@/context/languageContext';
import clsx from 'clsx';
import '../styles/style.scss';
import React from 'react';
import { Metadata } from 'next';

import { Source_Sans_3 } from 'next/font/google';

export const metadata: Metadata = {
  description: 'Portafolio personal Andrés Torres Sánchez',
};

// Load Inter and expose a CSS variable that matches the SCSS usage: --font-inter
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const defaultLocale = 'es';

  return (
    <html lang={defaultLocale} className={sourceSans.variable}>
      <body className={clsx(sourceSans.className, 'flex min-h-[100vh] flex-col bg-slate-100')}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
