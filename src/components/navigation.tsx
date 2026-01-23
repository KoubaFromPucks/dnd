'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/new-game', label: 'New Game' },
	{ href: '/other', label: 'Sth other' }
];

export const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between bg-gray-100 p-2 px-8">
			<Link href="/" className="rounded-xl hover:bg-gray-300">
				D&D MASTER
			</Link>
			<nav className="hidden gap-4 font-medium lg:flex">
				{links.map(link => (
					<NavLink
						key={link.href}
						href={link.href}
						label={link.label}
						pathname={pathname}
						onClick={() => {}}
					/>
				))}
			</nav>

			{isOpen && (
				<div className="absolute top-full left-0 w-full border-t bg-gray-100 lg:hidden">
					<nav className="flex flex-col items-center gap-2 p-4 font-medium">
						{links.map(link => (
							<NavLink
								key={link.href}
								href={link.href}
								label={link.label}
								pathname={pathname}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							/>
						))}
					</nav>
				</div>
			)}

			<div className="flex items-center gap-4">
				<div className="flex flex-col gap-1 rounded-xl p-2 hover:bg-gray-300 lg:hidden">
					<Menu
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					/>
				</div>
			</div>
		</header>
	);
};

const linkStyle = (href: string, pathname: string) =>
	`rounded-xl px-4 py-2 hover:bg-gray-300 ${
		pathname === href ? 'underline underline-offset-8 decoration-gray-400' : ''
	}`;

type NavLinkProps = {
	href: string;
	label: string;
	pathname: string;
	onClick: () => void;
};

const NavLink = ({ href, label, pathname, onClick }: NavLinkProps) => {
	return (
		<Link
			href={href}
			className={linkStyle(href, pathname)}
			onClick={() => {
				onClick();
			}}
		>
			{label}
		</Link>
	);
};
