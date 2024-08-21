import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucia';
import { SidebarUser } from '@/components/sidebar/SidebarUser';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';
import { useTranslations } from 'next-intl';

interface SidebarUserMenuProps {
	user: User;
	isCollapsed: boolean;
}

export const SidebarUserMenu = ({
	user,
	isCollapsed,
}: SidebarUserMenuProps) => {
	const t = useTranslations('Dashboard.Sidebar.Menu.User');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<SidebarUser isCollapsed={isCollapsed} user={user} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52">
				<DropdownMenuLabel>
					<span className="text-[12px] text-gray-400">@{user?.username}</span>
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
	);
};
