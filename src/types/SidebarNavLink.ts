import type { ReactNode } from 'react';

export interface SidebarNavLink {
	href: string;
	name: string;
	icon: ReactNode;
	children: string;
}
