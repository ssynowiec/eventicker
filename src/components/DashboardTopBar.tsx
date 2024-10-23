import { LocalSwitcher } from '@/components/LocalSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const DashboardTopBar = () => {
	return (
		<div className="flex items-center justify-between border-b-2 border-b-muted px-6 py-3">
			<div className="gap -4 flex">
				<SidebarTrigger />
			</div>
			<div className="flex gap-2">
				<LocalSwitcher />
				<ThemeSwitcher />
			</div>
		</div>
	);
};
