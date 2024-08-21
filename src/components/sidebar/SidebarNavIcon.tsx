'use client';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavIconProps {
	href: string;
	icon?: string | ReactNode;
	children: string;
}

export const SidebarNavIcon = ({
	href,
	icon,
	children,
}: SidebarNavIconProps) => {
	const currentPath = usePathname();
	const isActive = href === currentPath;

	return (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild>
				<Link
					href={href}
					className={cn(
						buttonVariants({
							variant: isActive ? 'secondary' : 'ghost',
							size: 'icon',
						}),
						'h-12 w-12 rounded-none',
					)}
				>
					{icon}
					<span className="sr-only">{children}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">
				<p>{children}</p>
			</TooltipContent>
		</Tooltip>
	);
};
