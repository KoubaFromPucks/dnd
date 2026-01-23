import './globals.css';
import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
import { Navigation } from '@/components/navigation';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'D&D Master',
	description: 'Dungeon Master assistant powered by AI'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en" className='h-full'>
		<body className={`flex h-full flex-col overflow-hidden ${poppins.className}`}>
			<Navigation />
			<main className="flex-1 relative overflow-hidden bg-slate-950">
				<Providers>{children}</Providers>
				<Toaster richColors position="bottom-right" />
			</main>
		</body>
	</html>
);

export default RootLayout;
