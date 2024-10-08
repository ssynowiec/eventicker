import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { ReactNode } from 'react';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/components/QueryProvider';
import { ToasterWithTheme } from '@/components/ToasterWithTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	const locale = await getLocale();

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<NextIntlClientProvider messages={messages}>
						<QueryProvider>
							{children}
							<ToasterWithTheme />
						</QueryProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
