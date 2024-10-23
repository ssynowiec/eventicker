import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface SidebarNavLink {
	category: string | undefined;
	categoryAction: string | undefined;
	categoryActionText: string | undefined;
	links: {
		href: string;
		name: string;
		icon: ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
		>;
		children: string;
		badge: Element | undefined;
	}[];
}
