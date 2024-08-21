import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const LogoutButton = () => {
	return (
		<DropdownMenuItem className="cursor-pointer">
			<Link
				href="/api/auth/logout"
				className="flex w-full items-center gap-2 text-destructive"
			>
				<LogOut className="h-4 w-4" /> Logout
			</Link>
		</DropdownMenuItem>
	);
};
