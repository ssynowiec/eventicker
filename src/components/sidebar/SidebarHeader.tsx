import { Logo } from '@/components/Logo';
import Link from 'next/link';

interface SidebarHeaderProps {
	isCollapsed: boolean;
}

export const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
	return isCollapsed ? (
		<div className="flex h-12 w-full items-center justify-center border-b-2 border-b-muted px-6 py-4 md:p-0">
			<div className="gap -4 flex items-center">
				<Link
					href="/"
					className="flex w-full items-center justify-center gap-2"
				>
					<Logo />
					<span className="sr-only text-2xl font-semibold">Eventicker</span>
				</Link>
			</div>
		</div>
	) : (
		<div className="flex items-center justify-between border-b-2 border-b-muted px-6 py-4">
			<div className="gap -4 flex">
				<Link
					href="/"
					className="flex w-full items-center justify-center gap-2"
				>
					<Logo />
					<h1 className="text-2xl font-semibold">Eventicker</h1>
				</Link>
			</div>
		</div>
	);
};
