import { ReactNode } from 'react';

export interface SidebarNavLink {
	category: string;
	categoryAction?: string;
	categoryActionText?: string;
	links: {
		href: string;
		name: string;
		icon: ReactNode;
		children: string;
		badge?: ReactNode | number | string;
	}[];
}
