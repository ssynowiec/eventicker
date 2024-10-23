'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from '@/components/ui/sidebar';
import { SidebarUserMenu } from '@/components/sidebar/SidebarUserMenu';
import { User } from 'lucia';
import { SidebarHeader } from './sidebar/SidebarHeader';
import type { SidebarNavLink } from '@/types/SidebarNavLink';
import { LifeBuoy, Plus } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
	user: User;
	mainNav: SidebarNavLink[];
}

export const DashboardSidebar = ({ user, mainNav }: DashboardSidebarProps) => {
	const pathname = usePathname();

	const { open, state } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader />
			<SidebarSeparator />
			<SidebarContent>
				{mainNav.map((section) => (
					<SidebarGroup key={section.category}>
						<SidebarGroupLabel>{section.category}</SidebarGroupLabel>
						{section.categoryAction && (
							<SidebarGroupAction title="Add Project">
								<Plus />{' '}
								<span className="sr-only">{section.categoryActionText}</span>
							</SidebarGroupAction>
						)}
						<SidebarGroupContent>
							<SidebarMenu>
								{section.links.map((item) => (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton
											asChild
											isActive={pathname === item.href}
										>
											<a href={item.href}>
												{item.icon}
												<span>{item.name}</span>
											</a>
										</SidebarMenuButton>
										{item.badge && (
											<SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
										)}
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
				<SidebarGroup className="mt-auto">
					<SidebarGroupContent>
						<SidebarMenu>
							{[
								{
									title: 'Support',
									url: '#',
									icon: LifeBuoy,
								},
							].map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild size="sm">
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>

						{state !== 'collapsed' && (
							<div className="p-1">
								<Card className="shadow-none">
									<form>
										<CardHeader className="p-4 pb-0">
											<CardTitle className="text-sm">
												Update your plan
											</CardTitle>
											<CardDescription>
												You are currently on the free plan.
											</CardDescription>
										</CardHeader>
										<CardContent className="grid gap-2.5 p-4">
											{/*<SidebarInput type="email" placeholder="Email" />*/}
											<Button
												className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
												size="sm"
											>
												Upgrade to PRO
											</Button>
										</CardContent>
									</form>
								</Card>
							</div>
						)}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<SidebarUserMenu user={user} />
			</SidebarFooter>
		</Sidebar>
	);
};
