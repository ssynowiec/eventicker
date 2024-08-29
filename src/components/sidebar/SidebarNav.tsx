import { SidebarNavIcon } from '@/components/sidebar/SidebarNavIcon';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { ReactNode } from 'react';
import { SidebarNavLink as SidebarNavLinkType } from '@/types/SidebarNavLink';
import { SidebarNavLink } from '@/components/sidebar/SidebarNavLink';

interface SidebarNavProps {
	isCollapsed: boolean;
	navLinks: SidebarNavLinkType[];
}

export const SidebarNav = ({ isCollapsed, navLinks }: SidebarNavProps) => {
	const renderSidebarNavLinkAndIcon = (
		href: string,
		icon: string | ReactNode,
		children: string,
	) => {
		if (isCollapsed) {
			return (
				<SidebarNavIcon href={href} icon={icon} key={href}>
					{children}
				</SidebarNavIcon>
			);
		}

		return (
			<SidebarNavLink href={href} icon={icon} key={href}>
				{children}
			</SidebarNavLink>
		);
	};

	return (
		<TooltipProvider delayDuration={0}>
			<nav className="flex-1">
				<ul className="flex flex-col gap-1">
					{navLinks.map(({ href, icon, children }) =>
						renderSidebarNavLinkAndIcon(href, icon, children),
					)}
				</ul>
			</nav>
		</TooltipProvider>
	);
};
