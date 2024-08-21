import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/auth/signOut';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const LogoutButton = () => {
	const t = useTranslations('Dashboard.Sidebar.Menu.User');

	return (
		<DropdownMenuItem className="cursor-pointer">
			<form action={logout} className="w-full">
				<button className="flex w-full items-center gap-2 text-destructive">
					<LogOut className="h-4 w-4" /> {t('logout')}
				</button>
			</form>
		</DropdownMenuItem>
	);
};
