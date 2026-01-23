'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sword } from 'lucide-react'; // Přidána ikona meče pro styl
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn'; // Předpokládám tvou pomocnou funkci

const links = [
    { href: '/new-game', label: 'Nová Hra' },
    { href: '/other', label: 'Archiv' }
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8 shadow-2xl">

		<Logo />

            {/* Desktop Navigation */}
            <nav className="hidden gap-2 font-medium lg:flex">
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

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full border-b border-slate-800 bg-slate-900 shadow-2xl lg:hidden animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col items-center gap-4 p-6 font-medium">
                        {links.map(link => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                pathname={pathname}
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </nav>
                </div>
            )}

            {/* Hamburger Button */}
            <div className="flex items-center gap-4 lg:hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-slate-400 hover:bg-slate-800 hover:text-amber-500 rounded-lg transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    );
};

// Pomocná funkce pro stylování odkazů
const linkStyle = (href: string, pathname: string) =>
    cn(
        "rounded-lg px-4 py-2 text-sm uppercase tracking-widest transition-all",
        "hover:bg-slate-800 hover:text-amber-500",
        pathname === href 
            ? "text-amber-600 bg-slate-800/50 shadow-[inset_0_0_10px_rgba(217,119,6,0.1)] border border-amber-600/20" 
            : "text-slate-400"
    );

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
            onClick={onClick}
        >
            {label}
        </Link>
    );
};

const Logo = () => (
	<Link href="/" className="flex items-center gap-2 group transition-colors">
                <Sword className="text-amber-600 group-hover:rotate-12 transition-transform" size={24} />
                <span className="font-serif text-xl font-bold tracking-tighter text-amber-600 uppercase">
                    D&D <span className="text-slate-200">Master</span>
                </span>
            </Link>
);