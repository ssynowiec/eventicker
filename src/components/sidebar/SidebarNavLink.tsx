'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarNavLinkProps {
	href: string;
	icon?: string | ReactNode;
	children: string | ReactNode;
}

export const SidebarNavLink = ({
	href,
	icon,
	children,
}: SidebarNavLinkProps) => {
	const currentPath = usePathname();
	const isActive = href === currentPath;

	return (
		<Link
			href={href}
			className={cn(
				buttonVariants({
					variant: isActive ? 'secondary' : 'ghost',
					size: 'sm',
				}),
				'flex h-12 justify-start rounded-none px-6',
			)}
		>
			{icon && <span className="mr-2">{icon}</span>}
			{children}
		</Link>
	);
};
