import { User } from 'lucia';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarNavIcon } from '@/components/sidebar/SidebarNavIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarNavLink } from '@/components/sidebar/SidebarNavLink';

interface SidebarUserProps {
	isCollapsed: boolean;
	user: User;
}

const userInitials = (name: string) => {
	if (!name.includes(' ')) {
		return name.charAt(0) + name.charAt(1);
	}

	const [firstName, lastName] = name.split(' ');
	return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const SidebarUser = ({ isCollapsed, user }: SidebarUserProps) => {
	return (
		<div className="flex w-full flex-col justify-end gap-1 border-t-2 border-t-muted">
			{isCollapsed ? (
				<TooltipProvider>
					<SidebarNavIcon
						href="/"
						icon={
							<Avatar className="h-8 w-8">
								<AvatarImage src={user.avatar} />
								<AvatarFallback>{userInitials(user.name)}</AvatarFallback>
							</Avatar>
						}
					>
						{user?.name ?? 'User'}
					</SidebarNavIcon>
				</TooltipProvider>
			) : (
				<SidebarNavLink
					href="/"
					icon={
						<Avatar className="h-8 w-8">
							<AvatarImage src={user.avatar} />
							<AvatarFallback>{userInitials(user.name)}</AvatarFallback>
						</Avatar>
					}
				>
					<div className="flex flex-col justify-start text-left">
						{user?.name ?? 'User'}
						<span className="text-[12px] text-gray-400">@{user?.username}</span>
					</div>
				</SidebarNavLink>
			)}
		</div>
	);
};
