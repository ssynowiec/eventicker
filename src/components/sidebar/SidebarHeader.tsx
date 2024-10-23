import {
	SidebarHeader as SidebarHeaderComponent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';

export const SidebarHeader = () => {
	return (
		<SidebarHeaderComponent>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" asChild>
						<a href="/">
							<div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<Logo />
								{/*<Command className="size-4" />*/}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">Eventicker</span>
								{/*<span className="truncate text-xs">Enterprise</span>*/}
							</div>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeaderComponent>
	);
};
