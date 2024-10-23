import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucia';
import Link from 'next/link';
import { ChevronsUpDown, UserIcon } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';
import { useTranslations } from 'next-intl';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarUserMenuProps {
	user: User;
}

export const SidebarUserMenu = ({ user }: SidebarUserMenuProps) => {
	const t = useTranslations('Dashboard.Sidebar.Menu.User');

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">
									{user.name.split(' ').length > 1
										? `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`
										: user.name.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side="bottom"
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel>
							<span className="text-[12px] text-gray-400">
								@{user?.username}
							</span>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link
								href="/profile"
								className="flex w-full items-center gap-2"
								prefetch={false}
							>
								<UserIcon className="h-4 w-4" />
								<span>{t('profile')}</span>
							</Link>
						</DropdownMenuItem>
						<LogoutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
