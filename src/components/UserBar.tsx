import { User } from 'lucia';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

interface UserBarProps {
	user: User;
}

export const UserBar = ({ user }: UserBarProps) => {
	return (
		<div className="flex justify-between bg-black p-2 text-sm text-white">
			<Link
				href="/dashboard"
				className="flex items-center gap-1 underline-offset-2 hover:underline"
			>
				<LayoutDashboard className="h-4 w-4" />
				Dashboard
			</Link>
			<p className="text-sm">You logged as: {user.username}</p>
		</div>
	);
};
